'use strict';

export default class item {
  constructor(queryWrapper) {
    this._query = queryWrapper;
  }

  inventory(data) {
    return this._query.post('/contentmgmt/item/inventory', data);
  }
  price(data) {
    return this._query.post('/contentmgmt/item/price', data);
  }
  inventoryandprice(data) {
    return this._query.put('/contentmgmt/item/inventory', data);
  }
}
