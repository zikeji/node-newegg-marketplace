class generator {
  constructor(sectionSchema) {
    this._sectionSchema = sectionSchema;
  }
  generate() {
    return this._readmeGenerator(this._sectionSchema);
  }

  _readmeGenerator(sectionSchema) {
    let out = this._tableOfContents(sectionSchema);
    out += `## General
All functions exposed by this library have parameters that line up with Newegg's parameters. Keep in mind this does not include the request body. The function parameters line up with the URL and GET parameters of the requires. The last and final parameter, \`data\`, would be the JSON formatted request body, as an [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object). The parameters \`versionno\` and \`sellerid\` are automatically added by the wrapper.

## Newegg Marketplace API Developer Guide

This section provides you with the relevant function to use in this library, and the parameters, when reading the developer guide. Each numbered section refers to the same section in the guide itself.
`;
    sectionSchema.forEach(section => {
      out += this._readmeSection(section);
    });
    return out;
  }

  _tableOfContents(sectionSchema) {
    let out = '### Table of Contents\n\n';
    out += '- [General](#general)\n';
    out += '- [Newegg Marketplace API Developer Guide](#newegg-marketplace-api-developer-guide)\n';
    sectionSchema.forEach(section => {
      out += `\t- [${section.section} ${section.title}](#${this._anchor(section.section, section.title)})\n`;
      section.subsections.forEach(subsection => {
        out += `\t\t- [${subsection.subsection} ${subsection.title}](#${this._anchor(subsection.subsection, subsection.title)})\n`;
      });
    });
    return out;
  }

  _anchor(location, title) {
    return `${location} ${title}`
      .trim()
      .toLowerCase()
      .replace(/[^\w\- ]+/g, '')
      .replace(/\s/g, '-')
      .replace(/-+$/, '');
  }

  _backtotop() {
    return '[^ back to top ^](#table-of-contents)\n';
  }

  _readmeSection(section) {
    let out = '\n';
    out += `### ${section.section} ${section.title}\n`;
    out += this._readmeSubSection(section.subsections);
    return out;
  }

  _readmeSubSection(subsections) {
    let out = '';
    subsections.forEach(subsection => {
      out += `#### ${subsection.subsection} ${subsection.title}\n`;
      out += '##### API Endpoint\n';
      out += '```http\n';
      out += `${subsection.method} ${subsection.resourceUrl}\n`;
      out += '```\n';
      out += '##### Function\n';
      out += '```javascript\n';
      out += `Marketplace.${subsection.class}.${subsection.function}(`;
      subsection.params.forEach(param => {
        out += `${param.identifier}, `;
      });
      if (subsection.method === 'GET') {
        out = out.slice(0, -2);
      } else {
        out += 'data';
      }
      out += ');\n';
      out += '```\n';
      out += this._backtotop();
    });
    return out;
  }
}

module.exports = generator;
