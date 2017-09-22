'use strict';

export default class ContentMgmt {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  GetInventory(data) {
    return this.QueryWrapper.query('POST', '/marketplace/contentmgmt/item/inventory', data);
  }
  GetPrice(data) {
    return this.QueryWrapper.query('POST', '/marketplace/contentmgmt/item/price', data);
  }
  UpdateInventoryandPrice(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/contentmgmt/item/inventoryandprice', data);
  }
  GetManufacturer(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/contentmgmt/manufacturer/manufacturerinfo', data);
  }
  AddManufacturer(data) {
    return this.QueryWrapper.query('POST', '/marketplace/contentmgmt/manufacturer/creationrequest', data);
  }
  GetManufacturerProcessStatus(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/contentmgmt/manufacturer/creationrequeststatus', data);
  }
  SubmitVolumeDiscount(data) {
    return this.QueryWrapper.query('POST', '/marketplace/contentmgmt/item/volumediscount', data);
  }
  GetVolumeDiscount(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/contentmgmt/item/volumediscount', data);
  }
  GetInternationalInventory(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/contentmgmt/item/international/inventory', data);
  }
  GetInternationalPrice(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/contentmgmt/item/international/price', data);
  }
  UpdateInternationalInventory(data) {
    return this.QueryWrapper.query('POST', '/marketplace/contentmgmt/item/international/inventory', data);
  }
  UpdateInternationalPrice(data) {
    return this.QueryWrapper.query('POST', '/marketplace/contentmgmt/item/international/price', data);
  }
}