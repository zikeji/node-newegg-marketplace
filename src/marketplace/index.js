'use strict';

import querywrapper from '../querywrapper';
import contentmgmt from './contentmgmt';

export default class NeweggMarketplaceAPI {
  constructor(sellerId, authorization, secretKey) {
    this.querywrapper = new querywrapper(sellerId, authorization, secretKey);
    this.contentmgmt = new contentmgmt(this.querywrapper);
  }
}
