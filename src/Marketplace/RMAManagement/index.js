'use strict';

export default class RMAManagement {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  SubmitRMA(data) {
    return this.QueryWrapper.query('POST', '/marketplace/servicemgmt/rma/newrma', data);
  }
  UpdateRMA(data) {
    return this.QueryWrapper.query('POST', '/marketplace/servicemgmt/rma/updaterma', data);
  }
  GetRMAInfo(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/servicemgmt/rma/rmainfo', data);
  }
  IssueCourtesyRefund(data) {
    return this.QueryWrapper.query('POST', '/marketplace/servicemgmt/courtesyrefund/new', data);
  }
  GetCourtesyRefundStatus(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/servicemgmt/courtesyrefund/requeststatus', data);
  }
}