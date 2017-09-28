'use strict';

import QueryWrapper from '../QueryWrapper';
import SellerMgmt from './SellerMgmt';
import ContentMgmt from './ContentMgmt';
import OrderMgmt from './OrderMgmt';
import ShippingLabel from './ShippingLabel';
import DataFeedMgmt from './DataFeedMgmt';
import RMAManagement from './RMAManagement';
import ReportMgmt from './ReportMgmt';
import SBNMgmt from './SBNMgmt';

export default class NeweggMarketplaceAPI {
  constructor(sellerId, authorization, secretKey, timeout, failover) {
    this.QueryWrapper = new QueryWrapper(sellerId, authorization, secretKey, timeout, failover);
    this.SellerMgmt = new SellerMgmt(this.QueryWrapper);
    this.ContentMgmt = new ContentMgmt(this.QueryWrapper);
    this.OrderMgmt = new OrderMgmt(this.QueryWrapper);
    this.ShippingLabel = new ShippingLabel(this.QueryWrapper);
    this.DataFeedMgmt = new DataFeedMgmt(this.QueryWrapper);
    this.RMAManagement = new RMAManagement(this.QueryWrapper);
    this.ReportMgmt = new ReportMgmt(this.QueryWrapper);
    this.SBNMgmt = new SBNMgmt(this.QueryWrapper);
  }
}
