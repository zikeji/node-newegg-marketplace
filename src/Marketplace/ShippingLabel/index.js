'use strict';

export default class ShippingLabel {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  SubmitShippingRequest(data) {
    return this.QueryWrapper.query('POST', '/marketplace/shippingservice/shippinglabel/shippingrequest', data);
  }
  GetShippingRequest(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/shippingservice/shippinglabel/shippingdetail', data);
  }
  ConfirmShippingRequest(data) {
    return this.QueryWrapper.query('POST', '/marketplace/shippingservice/shippinglabel/confirmshippingrequest', data);
  }
  VoidShippingRequest(data) {
    return this.QueryWrapper.query('POST', '/marketplace/shippingservice/shippinglabel/voidshippingrequest', data);
  }
  GetPackageList(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/shippingservice/shippinglabel/packagelist', data);
  }
  GetShippingLabels(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/shippingservice/shippinglabel/shippinglabels', data);
  }
}