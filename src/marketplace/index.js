'use strict';

import querywrapper from '../querywrapper';
import contentmgmt from './contentmgmt';

export default class NeweggMarketplaceAPI {
  constructor(sellerId, authorization, secretKey, apiUrl) {
    if (!apiUrl) apiUrl = 'https://api.newegg.com/marketplace';
    this._query = new querywrapper(sellerId, authorization, secretKey, apiUrl);
    this.contentmgmt = new contentmgmt(this._query);
  }
}
