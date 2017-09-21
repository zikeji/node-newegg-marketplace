'use strict';

export default class manufacturer {
  constructor(querywrapper) {
    this.querywrapper = querywrapper;
  }

  manufacturerinfo(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/manufacturer/manufacturerinfo', data);
  }

  creationrequest(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/manufacturer/creationrequest', data);
  }

  creationrequeststatus(method, data) {
    return this.querywrapper.query(method, '/contentmgmt/manufacturer/creationrequeststatus', data);
  }
}
