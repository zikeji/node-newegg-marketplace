if (!process.argv[2] || !process.argv[3]) {
    console.log('Missing parameters!');
    console.log('Provide PDF file path (argument one) and JSON output path (argument two).');
    process.exit(-1);
}

const pdfPath = process.argv[2];
const outPath = process.argv[3];

const fs = require('fs');
const Readable = require('stream').Readable;
const split = require('split');
const PDFParser = require('pdf2json');

const pdfParser = new PDFParser(this, 1);

const sectionParser = /^(\d+\.)\ (.*)$/g
const subSectionParser = /^(\d+\.\d+\.)\ (.*)$/g
const resourceInformationParser = /^(PUT|GET|POST|DELETE)\s(\w+) (\w+, \w+) (\w+, \w+)(.*)$/g;

let isGoingThroughContents = true;
let contents = [];
const contentParser = /^(\d+\.+) (.+?)(?=\.\.\.\.)/g;

const apiMethods = [];
let currentSection;
let isActiveSection = false;
let currentApiMethod;
let isActiveAPIMethod = false;
let matchedResourceURL = false;
let isExpectingMethodRows = false;
const lineHandler = (line) => {
    if (isGoingThroughContents) {
        const p = contentParser.exec(line);
        if (p) {
            contents.push({section: p[1], title: p[2].trim()});
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
                if (isActiveSection) { // push current data to the apiMethods array
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
                if (isActiveAPIMethod) { // cleanup last run through a method
                    if (matchedResourceURL) { // not a method if there is no resource URL
                        if (currentApiMethod.subsection.includes(currentSection.section)) { // not a method if the method doesn't belong!
                            currentSection.subsections.push(currentApiMethod);
                        }
                    }
                    matchedResourceURL = false;
                    isExpectingMethodRows = false;
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
                if (/^https\:\/\/api\.newegg\.com\//g.test(line)) {
                    if (!matchedResourceURL) {
                        matchedResourceURL = true;
                        currentApiMethod.resourceUrl = line;
                    }
                }
                if (line.includes('Resource Information')) {
                    isExpectingMethodRows = true;
                }
                if (isExpectingMethodRows) {
                    const match = resourceInformationParser.exec(line);
                    if (match) {
                        isExpectingMethodRows = false;
                        currentApiMethod.resourceInformation.httpMethod = match[1];
                        currentApiMethod.resourceInformation.authentication = match[2];
                        currentApiMethod.resourceInformation.requestFormats = match[3].includes(', ') ? match[3].split(', ') : [ match[3] ];
                        currentApiMethod.resourceInformation.responseFormats = match[4].includes(', ') ? match[4].split(', ') : [ match[4] ];
                        currentApiMethod.resourceInformation.rateLimited = match[5].trim();
                    }
                }
            }
        }
    }
};

const finishHandler = () => {
    const out = apiMethods.filter(section => section.subsections.length > 0)
    fs.writeFile(outPath, JSON.stringify(out), () => {
        console.log('Finished. Writing output to file.');
        fs.unlink('./tmppdftext.txt', () => {
            process.exit();
        })
    });
}

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile('./tmppdftext.txt', pdfParser.getRawTextContent().replace(/^.*Page \(.*\) Break.*$/mg, ''), (err) => {
        if (!err) {
            fs.createReadStream('./tmppdftext.txt').pipe(split()).on('data', lineHandler).on('end', finishHandler);
        } else {
            console.error(err);
        }
    });
});

pdfParser.loadPDF(pdfPath);