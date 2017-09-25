'use strict';

export default class DataFeedMgmt {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  SubmitFeed(RequestType, data) {
    return this.QueryWrapper.query('POST', '/marketplace/datafeedmgmt/feeds/submitfeed', data, [
      {
        param: 'requesttype',
        value: RequestType,
      },
    ]);
  }
  GetFeedStatus(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/datafeedmgmt/feeds/status', data);
  }
  ProcessingReport(Requestid) {
    return this.QueryWrapper.query('GET', `/marketplace/datafeedmgmt/feeds/result/${Requestid}`, null);
  }
}