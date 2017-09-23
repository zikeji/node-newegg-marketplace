module.exports = (curClass, functions) => {
  let out = `'use strict';

export default class ${curClass} {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

`;
  const functionNames = Object.keys(functions);

  functionNames.forEach(functionName => {
    const curFunction = functions[functionName];
    let useTemplate = false;
    const queryParams = [];
    out += `  ${functionName}(`;
    curFunction.params.forEach(param => {
      out += `${param.identifier}, `;
      if (param.type === 'url') useTemplate = true;
      if (param.type === 'queryParam') {
        queryParams.push(param.identifier);
      }
    });
    if (curFunction.method === 'GET') {
      out = out.slice(0, -2);
    } else {
      out += 'data';
    }
    out += ') {\n';
    out += `    return this.QueryWrapper.query('${curFunction.method}', ${useTemplate ? '`' : "'"}${curFunction.endpoint}${useTemplate
      ? '`'
      : "'"}, ${curFunction.method === 'GET' ? 'null' : 'data'}`;

    if (queryParams.length > 0) {
      out += ', [\n';
      queryParams.forEach(param => {
        out += `      {
        param: '${param.toLowerCase()}',
        value: ${param},
      },
    `;
      });
      out += ']';
    }

    out += ');\n';

    out += '  }\n';
  });

  out += '}';
  return out;
};

/*
  inventory(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/item/inventory', data);
  }

*/
