'use strict';

import item from './item';

export default class contentmgmt {
  constructor(queryWrapper) {
    this._query = queryWrapper;
    this.item = new item(this._query);
  }
  servicestatus() {
    return this._query.get('/contentmgmt/servicestatus');
  }
}
