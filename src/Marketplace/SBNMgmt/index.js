'use strict';

export default class SBNMgmt {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  GetInboundShipmentPlan(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sbnmgmt/inboundshipment/plansuggestion', data);
  }
  SubmitInboundShipment(data) {
    return this.QueryWrapper.query('POST', '/marketplace/sbnmgmt/inboundshipment/shipmentrequest', data);
  }
  GetInboundShipmentStatus(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sbnmgmt/inboundshipment/shipmentstatus', data);
  }
  GetInboundShipmentResult(requestid, data) {
    return this.QueryWrapper.query('GET', `/marketplace/sbnmgmt/inboundshipment/shipmentresult/${requestid}`, data);
  }
  GetInboundShipmentList(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sbnmgmt/inboundshipment/shipmentlist', data);
  }
}