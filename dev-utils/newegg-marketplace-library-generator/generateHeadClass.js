module.exports = classes => {
  let out = `'use strict';

import QueryWrapper from '../QueryWrapper';\n`;

  classes.forEach(curClass => {
    out += `import ${curClass} from './${curClass}';\n`;
  });

  out += `
export default class NeweggMarketplaceAPI {
  constructor(sellerId, authorization, secretKey) {
    this.QueryWrapper = new QueryWrapper(sellerId, authorization, secretKey);\n`;

  classes.forEach(curClass => {
    out += `    this.${curClass} = new ${curClass}(this.QueryWrapper);\n`;
  });

  out += `  }
}`;
  return out;
};

/*
//import contentmgmt from './contentmgmt';

export default class NeweggMarketplaceAPI {
  constructor(sellerId, authorization, secretKey) {
    this.querywrapper = new querywrapper(sellerId, authorization, secretKey);
    //this.contentmgmt = new contentmgmt(this.querywrapper);
  }
}
*/
