'use strict';

export default class item {
  constructor(querywrapper) {
    this.querywrapper = querywrapper;
  }

  inventory(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/item/inventory', data);
  }

  price(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/item/price', data);
  }

  inventoryandprice(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/item/inventory', data);
  }

  volumediscount(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/item/volumediscount', data);
  }
}
