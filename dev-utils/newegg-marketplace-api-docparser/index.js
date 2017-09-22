if (!process.argv[2] || !process.argv[3]) {
  console.log('Missing parameters!');
  console.log('Provide PDF file path (argument one) and JSON output path (argument two).');
  process.exit(-1);
}

const pdfPath = process.argv[2];
const outPath = process.argv[3];

const fs = require('fs');
const url = require('url');
const split = require('split');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1);

let isGoingThroughContents = true;
const contents = [];
const contentParser = /^(\d+\.+) (.+?)(?=\.\.\.\.)/g;

const sectionParser = /^(\d+\.) (.*)$/g;
const subSectionParser = /^(\d+\.\d+\.) (.*)$/g;
const resourceInformationParser = /^(PUT|GET|POST|DELETE)\s(\w+) (\w+, \w+) (\w+, \w+)(.*)$/g;

const xsdLineParser = /^API Schema\s>\s(.*)(?:Request|Response)\.xsd\s*$/g;

const apiMethods = [];
let currentSection;
let isActiveSection = false;
let currentApiMethod;
let isActiveAPIMethod = false;
let matchedResourceURL = false;
const lineHandler = line => {
  if (isGoingThroughContents) {
    const p = contentParser.exec(line);
    if (p) {
      contents.push({ section: p[1], title: p[2].trim() });
    }
  }

  if (/^Change History\s$/g.test(line)) {
    isGoingThroughContents = false;
  }

  if (!isGoingThroughContents) {
    const section = sectionParser.exec(line);
    if (section) {
      const isValid = contents.find(p => p.section === section[1] && p.title === section[2].trim());
      if (isValid) {
        if (isActiveSection) {
          // push current data to the apiMethods array
          apiMethods.push(currentSection);
        }

        isActiveSection = true;
        currentSection = {
          section: section[1],
          title: section[2].trim(),
          subsections: [],
        };
      }
    }
    if (currentSection) {
      const subsection = subSectionParser.exec(line);
      if (subsection) {
        // new API method
        if (isActiveAPIMethod) {
          // cleanup last run through a method
          if (matchedResourceURL) {
            // not a method if there is no resource URL
            if (currentApiMethod.subsection.includes(currentSection.section)) {
              // not a method if the method doesn't belong!
              currentSection.subsections.push(currentApiMethod);
            }
          }
          matchedResourceURL = false;
        }

        isActiveAPIMethod = true;
        currentApiMethod = {
          subsection: subsection[1],
          title: subsection[2].trim(),
          resourceUrl: null,
          resourceInformation: {
            httpMethod: null,
            authentication: null,
            requestFormats: null,
            responseFormats: null,
            rateLimited: null,
          },
          XSD: [],
        };
      }

      if (isActiveAPIMethod) {
        if (/^https:\/\/api\.newegg\.com\//g.test(line)) {
          if (!matchedResourceURL) {
            matchedResourceURL = true;
            currentApiMethod.resourceUrl = line;
          }
        }
        const rInf = resourceInformationParser.exec(line);
        if (rInf) {
          currentApiMethod.resourceInformation.httpMethod = rInf[1];
          currentApiMethod.resourceInformation.authentication = rInf[2];
          currentApiMethod.resourceInformation.requestFormats = rInf[3].includes(', ') ? rInf[3].split(', ') : [rInf[3]];
          currentApiMethod.resourceInformation.responseFormats = rInf[4].includes(', ') ? rInf[4].split(', ') : [rInf[4]];
          currentApiMethod.resourceInformation.rateLimited = rInf[5].trim();
        }
        const XSD = xsdLineParser.exec(line);
        if (XSD) {
          const sX = XSD[1].split(' > ');
          currentApiMethod.XSD = sX;
        }
      }
    }
  }
};

const recursiveFunctionGenerator = (index, subsections, xsdIndex) => {
  if (!xsdIndex) xsdIndex = 1;
  let dupe = false;
  const XSD = subsections[index].XSD;
  for (let i = 0; i < subsections.length; i++) {
    if (index !== i) {
      if (subsections[i].XSD[xsdIndex] === XSD[xsdIndex]) {
        dupe = true;
      }
    }
  }
  if (dupe) {
    return recursiveFunctionGenerator(index, subsections, ++xsdIndex);
  }
  return XSD[xsdIndex];
};

const commonParams = ['sellerid', 'versionno'];
const extractParams = /(\/|=)%7B(.*?)%7D/g;
const commonParamExists = param => commonParams.find(commonParam => commonParam === param);
const getParams = subsection => {
  const out = [];
  const resourceUrl = url.parse(subsection.resourceUrl);
  let param = extractParams.exec(resourceUrl.path);
  while (param !== null) {
    if (!commonParamExists(param[2])) {
      if (param[1] === '/') {
        out.push({
          type: 'url',
          identifier: param[2],
        });
      } else if (param[1] === '=') {
        out.push({
          type: 'queryParam',
          identifier: param[2],
        });
      }
    }
    param = extractParams.exec(resourceUrl.path);
  }
  return out;
};

const urlParam = /%7B(.*?)%7D/g;
const getEndpoint = resourceUrl => {
  resourceUrl = url.parse(resourceUrl);
  const parts = resourceUrl.pathname.split('/');
  for (let i = 0; i < parts.length; i++) {
    const part = urlParam.exec(parts[i]);
    if (part) {
      parts[i] = `$\{${part[1]}}`;
    }
  }
  return parts.join('/');
};

const generateSubSectionSchema = subsections => {
  for (let i = 0; i < subsections.length; i++) {
    subsections[i].class = subsections[i].XSD[0];
    subsections[i].function = recursiveFunctionGenerator(i, subsections);
    subsections[i].method = subsections[i].resourceInformation.httpMethod;
    subsections[i].endpoint = getEndpoint(subsections[i].resourceUrl);
    subsections[i].params = getParams(subsections[i]);
  }
  return subsections;
};

const generateSectionSchema = sections => {
  for (let i = 0; i < sections.length; i++) {
    sections[i].subsections = generateSubSectionSchema(sections[i].subsections);
  }
  return sections;
};

const generateClassDef = sections => {
  const out = {};
  for (let i = 0; i < sections.length; i++) {
    for (let ii = 0; ii < sections[i].subsections.length; ii++) {
      const subsection = sections[i].subsections[ii];
      if (!out[subsection.class]) out[subsection.class] = {};
      out[subsection.class][subsection.function] = {
        method: subsection.method,
        endpoint: subsection.endpoint,
        params: subsection.params,
      };
    }
  }
  return out;
};

const finishHandler = () => {
  const out = {
    sectionSchema: generateSectionSchema(apiMethods.filter(section => section.subsections.length > 0)),
  };
  out.classDef = generateClassDef(out.sectionSchema);
  fs.writeFile(outPath, JSON.stringify(out), () => {
    console.log('Finished. Writing output to file.');
    fs.unlink('./tmppdftext.txt', () => {
      process.exit();
    });
  });
};

pdfParser.on('pdfParser_dataError', errData => console.error(errData.parserError));
pdfParser.on('pdfParser_dataReady', () => {
  fs.writeFile('./tmppdftext.txt', pdfParser.getRawTextContent().replace(/^.*Page \(.*\) Break.*$/gm, ''), err => {
    if (!err) {
      fs
        .createReadStream('./tmppdftext.txt')
        .pipe(split())
        .on('data', lineHandler)
        .on('end', finishHandler);
    } else {
      console.error(err);
    }
  });
});

pdfParser.loadPDF(pdfPath);
