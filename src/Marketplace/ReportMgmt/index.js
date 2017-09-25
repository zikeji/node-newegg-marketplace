'use strict';

export default class ReportMgmt {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  SubmitReport(data) {
    return this.QueryWrapper.query('POST', '/marketplace/reportmgmt/report/submitrequest', data);
  }
  GetReportStatus(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/reportmgmt/report/status', data);
  }
  GetReport(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/reportmgmt/report/result', data);
  }
}