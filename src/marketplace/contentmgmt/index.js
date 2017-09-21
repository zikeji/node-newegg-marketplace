'use strict';

import item from './item';
import manufacturer from './manufacturer';

export default class contentmgmt {
  constructor(querywrapper) {
    this.querywrapper = querywrapper;
    this.item = new item(this.querywrapper);
    this.manufacturer = new manufacturer(this.querywrapper);
  }

  servicestatus() {
    return this.querywrapper.query('GET', '/contentmgmt/servicestatus');
  }
}
