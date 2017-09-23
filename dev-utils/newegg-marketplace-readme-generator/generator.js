class generator {
  constructor(sectionSchema) {
    this._sectionSchema = sectionSchema;
  }
  generate() {
    return this._readmeGenerator(this._sectionSchema);
  }

  _readmeGenerator(sectionSchema) {
    let out = this._tableOfContents(sectionSchema);

    sectionSchema.forEach(section => {
      out += this._readmeSection(section);
    });
    return out;
  }

  _tableOfContents(sectionSchema) {
    let out = '### Table of Contents\n\n';
    sectionSchema.forEach(section => {
      out += `- [${section.section} ${section.title}](#${this._anchor(section.section, section.title)})\n`;
      section.subsections.forEach(subsection => {
        out += `\t- [${subsection.subsection} ${subsection.title}](#${this._anchor(subsection.subsection, subsection.title)})\n`;
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
      .replace(/\-+$/, '');
  }

  _backtotop() {
    return `[^ back to top](#table-of-contents)\n`;
  }

  _readmeSection(section) {
    let out = '\n';
    out += `## ${section.section} ${section.title}\n`;
    out += this._readmeSubSection(section.subsections);
    return out;
  }

  _readmeSubSection(subsections) {
    let out = '';
    subsections.forEach(subsection => {
      out += `### ${subsection.subsection} ${subsection.title}\n`;
      out += '##### API Endpoint\n';
      out += `\`${subsection.method} ${subsection.resourceUrl}\`\n`;
      out += '##### Function\n';
      out += '```javascript\n';
      out += `Marketplace.${subsection.class}.${subsection.function}(`;
      subsection.params.forEach(param => {
        out += `${param.identifier}, `;
      });
      out += 'data);\n';
      out += '```\n';
      out += this._backtotop();
    });
    return out;
  }
}

module.exports = generator;
