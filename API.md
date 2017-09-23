### Table of Contents

- [8. Service Status](#8-service-status)
	- [8.1. Get Service Status](#81-get-service-status)
- [9. Item Management](#9-item-management)
	- [9.1. Get Item Inventory](#91-get-item-inventory)
	- [9.2. Get Item Price](#92-get-item-price)
	- [9.3. Update Inventory and Price](#93-update-inventory-and-price)
	- [9.4. Manufacturer Lookup](#94-manufacturer-lookup)
	- [9.5. Submit Manufacturer Request](#95-submit-manufacturer-request)
	- [9.6. Get Manufacturer Request Status](#96-get-manufacturer-request-status)
	- [9.7. Volume Discount Creation/Update/Removal](#97-volume-discount-creationupdateremoval)
	- [9.8. Get Volume Discount Request Result](#98-get-volume-discount-request-result)
	- [9.9. International Program - Get Item Inventory](#99-international-program---get-item-inventory)
	- [9.10. International Program - Get Item Price](#910-international-program---get-item-price)
	- [9.11. International Program - Update Item Inventory](#911-international-program---update-item-inventory)
	- [9.12. International Program - Update Item Price](#912-international-program---update-item-price)
- [10. Order Management](#10-order-management)
	- [10.1. Get Order Status](#101-get-order-status)
	- [10.2. Update Order Status](#102-update-order-status)
	- [10.3. Order Confirmation](#103-order-confirmation)
	- [10.4. Remove Item(s)](#104-remove-items)
	- [10.5. Get Order Info](#105-get-order-info)
- [11. Newegg Shipping Label Service](#11-newegg-shipping-label-service)
	- [11.1. Submit Shipping Request](#111-submit-shipping-request)
	- [11.2. Get Request Detail](#112-get-request-detail)
	- [11.3. Confirm Shipping Request](#113-confirm-shipping-request)
	- [11.4. Void Shipping Request](#114-void-shipping-request)
	- [11.5. Get Package List](#115-get-package-list)
- [12. DataFeed Management](#12-datafeed-management)
	- [12.1. Submit Feed](#121-submit-feed)
	- [12.2. Get Feed Status](#122-get-feed-status)
- [13. RMA Management](#13-rma-management)
	- [13.1. Submit RMA](#131-submit-rma)
	- [13.2. Update RMA](#132-update-rma)
	- [13.3. Get RMA Info](#133-get-rma-info)
	- [13.4. Issue Courtesy Refund](#134-issue-courtesy-refund)
	- [13.5. Get Courtesy Refund Request Status](#135-get-courtesy-refund-request-status)
- [14. Report Management](#14-report-management)
	- [14.1. Submit Report Request](#141-submit-report-request)
	- [14.2. Get Report Status](#142-get-report-status)
- [15. Seller Management](#15-seller-management)
	- [15.1. Get Industry List](#151-get-industry-list)
	- [15.2. Get Subcategory Status](#152-get-subcategory-status)
	- [15.3. Download Feed Schema](#153-download-feed-schema)
	- [15.4. Get Subcategory Properties](#154-get-subcategory-properties)
	- [15.5. Get Subcategory Property Values](#155-get-subcategory-property-values)
- [16. SBN (Shipped by Newegg) Management](#16-sbn-shipped-by-newegg-management)
	- [16.1. Get Inbound Shipment Plan Suggestion](#161-get-inbound-shipment-plan-suggestion)
	- [16.2. Submit Inbound Shipment Request](#162-submit-inbound-shipment-request)
	- [16.3. Get Inbound Shipment Status Request](#163-get-inbound-shipment-status-request)
	- [16.4. Get Inbound Shipment Request Result](#164-get-inbound-shipment-request-result)
	- [16.5. Get Inbound Shipment List](#165-get-inbound-shipment-list)

## 8. Service Status
### 8.1. Get Service Status
##### API Endpoint
`GET https://api.newegg.com/marketplace/{domain}/servicestatus?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SellerMgmt.SellerStatusCheck(domain, data);
```
[^ back to top](#table-of-contents)

## 9. Item Management
### 9.1. Get Item Inventory
##### API Endpoint
`POST https://api.newegg.com/marketplace/contentmgmt/item/inventory?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.ContentMgmt.GetInventory(data);
```
[^ back to top](#table-of-contents)
### 9.2. Get Item Price
##### API Endpoint
`POST https://api.newegg.com/marketplace/contentmgmt/item/price?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.GetPrice(data);
```
[^ back to top](#table-of-contents)
### 9.3. Update Inventory and Price
##### API Endpoint
`PUT https://api.newegg.com/marketplace/contentmgmt/item/inventoryandprice?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.ContentMgmt.UpdateInventoryandPrice(data);
```
[^ back to top](#table-of-contents)
### 9.4. Manufacturer Lookup
##### API Endpoint
`PUT https://api.newegg.com/marketplace/contentmgmt/manufacturer/manufacturerinfo?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.GetManufacturer(data);
```
[^ back to top](#table-of-contents)
### 9.5. Submit Manufacturer Request
##### API Endpoint
`POST https://api.newegg.com/marketplace/contentmgmt/manufacturer/creationrequest?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.AddManufacturer(data);
```
[^ back to top](#table-of-contents)
### 9.6. Get Manufacturer Request Status
##### API Endpoint
`PUT https://api.newegg.com/marketplace/contentmgmt/manufacturer/creationrequeststatus?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.GetManufacturerProcessStatus(data);
```
[^ back to top](#table-of-contents)
### 9.7. Volume Discount Creation/Update/Removal
##### API Endpoint
`POST https://api.newegg.com/marketplace/contentmgmt/item/volumediscount?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.SubmitVolumeDiscount(data);
```
[^ back to top](#table-of-contents)
### 9.8. Get Volume Discount Request Result
##### API Endpoint
`PUT https://api.newegg.com/marketplace/contentmgmt/item/volumediscount?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.GetVolumeDiscount(data);
```
[^ back to top](#table-of-contents)
### 9.9. International Program - Get Item Inventory
##### API Endpoint
`PUT https://api.newegg.com/marketplace/contentmgmt/item/international/inventory?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.GetInternationalInventory(data);
```
[^ back to top](#table-of-contents)
### 9.10. International Program - Get Item Price
##### API Endpoint
`PUT https://api.newegg.com/marketplace/contentmgmt/item/international/price?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.GetInternationalPrice(data);
```
[^ back to top](#table-of-contents)
### 9.11. International Program - Update Item Inventory
##### API Endpoint
`POST https://api.newegg.com/marketplace/contentmgmt/item/international/inventory?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.UpdateInternationalInventory(data);
```
[^ back to top](#table-of-contents)
### 9.12. International Program - Update Item Price
##### API Endpoint
`POST https://api.newegg.com/marketplace/contentmgmt/item/international/price?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ContentMgmt.UpdateInternationalPrice(data);
```
[^ back to top](#table-of-contents)

## 10. Order Management
### 10.1. Get Order Status
##### API Endpoint
`GET https://api.newegg.com/marketplace/ordermgmt/orderstatus/orders/{ordernumber}?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.OrderMgmt.GetOrderStatus(ordernumber, data);
```
[^ back to top](#table-of-contents)
### 10.2. Update Order Status
##### API Endpoint
`PUT https://api.newegg.com/marketplace/ordermgmt/orderstatus/orders/{ordernumber}?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.OrderMgmt.UpdateOrder(ordernumber, data);
```
[^ back to top](#table-of-contents)
### 10.3. Order Confirmation
##### API Endpoint
`POST https://api.newegg.com/marketplace/ordermgmt/orderstatus/orders/confirmation?sellerid={sellerid} `
##### Function
```javascript
Marketplace.OrderMgmt.OrderConfirm(data);
```
[^ back to top](#table-of-contents)
### 10.4. Remove Item(s)
##### API Endpoint
`PUT https://api.newegg.com/marketplace/ordermgmt/killitem/orders/{ordernumber}?sellerid={sellerid} `
##### Function
```javascript
Marketplace.OrderMgmt.RemoveItem(ordernumber, data);
```
[^ back to top](#table-of-contents)
### 10.5. Get Order Info
##### API Endpoint
`PUT https://api.newegg.com/marketplace/ordermgmt/order/orderinfo?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.OrderMgmt.GetOrderInfo(data);
```
[^ back to top](#table-of-contents)

## 11. Newegg Shipping Label Service
### 11.1. Submit Shipping Request
##### API Endpoint
`POST https://api.newegg.com/marketplace/shippingservice/shippinglabel/shippingrequest?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ShippingLabel.SubmitShippingRequest(data);
```
[^ back to top](#table-of-contents)
### 11.2. Get Request Detail
##### API Endpoint
`PUT https://api.newegg.com/marketplace/shippingservice/shippinglabel/shippingdetail?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ShippingLabel.GetShippingRequest(data);
```
[^ back to top](#table-of-contents)
### 11.3. Confirm Shipping Request
##### API Endpoint
`POST https://api.newegg.com/marketplace/shippingservice/shippinglabel/confirmshippingrequest?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ShippingLabel.ConfirmShippingRequest(data);
```
[^ back to top](#table-of-contents)
### 11.4. Void Shipping Request
##### API Endpoint
`POST https://api.newegg.com/marketplace/shippingservice/shippinglabel/voidshippingrequest?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ShippingLabel.VoidShippingRequest(data);
```
[^ back to top](#table-of-contents)
### 11.5. Get Package List
##### API Endpoint
`PUT https://api.newegg.com/marketplace/shippingservice/shippinglabel/packagelist?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ShippingLabel.GetPackageList(data);
```
[^ back to top](#table-of-contents)

## 12. DataFeed Management
### 12.1. Submit Feed
##### API Endpoint
`POST https://api.newegg.com/marketplace/datafeedmgmt/feeds/submitfeed?sellerid={sellerid}&requesttype={RequestType} `
##### Function
```javascript
Marketplace.DataFeedMgmt.DataFeedSchema(RequestType, data);
```
[^ back to top](#table-of-contents)
### 12.2. Get Feed Status
##### API Endpoint
`PUT https://api.newegg.com/marketplace/datafeedmgmt/feeds/status?sellerid={sellerid} `
##### Function
```javascript
Marketplace.DataFeedMgmt.GetFeedStatus(data);
```
[^ back to top](#table-of-contents)

## 13. RMA Management
### 13.1. Submit RMA
##### API Endpoint
`POST https://api.newegg.com/marketplace/servicemgmt/rma/newrma?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.RMAManagement.SubmitRMA(data);
```
[^ back to top](#table-of-contents)
### 13.2. Update RMA
##### API Endpoint
`POST https://api.newegg.com/marketplace/servicemgmt/rma/updaterma?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.RMAManagement.UpdateRMA(data);
```
[^ back to top](#table-of-contents)
### 13.3. Get RMA Info
##### API Endpoint
`PUT https://api.newegg.com/marketplace/servicemgmt/rma/rmainfo?sellerid={sellerid}&version={versionno} `
##### Function
```javascript
Marketplace.RMAManagement.GetRMAInfo(data);
```
[^ back to top](#table-of-contents)
### 13.4. Issue Courtesy Refund
##### API Endpoint
`POST https://api.newegg.com/marketplace/servicemgmt/courtesyrefund/new?sellerid={sellerid} `
##### Function
```javascript
Marketplace.RMAManagement.IssueCourtesyRefund(data);
```
[^ back to top](#table-of-contents)
### 13.5. Get Courtesy Refund Request Status
##### API Endpoint
`PUT https://api.newegg.com/marketplace/servicemgmt/courtesyrefund/requeststatus?sellerid={sellerid} `
##### Function
```javascript
Marketplace.RMAManagement.GetCourtesyRefundStatus(data);
```
[^ back to top](#table-of-contents)

## 14. Report Management
### 14.1. Submit Report Request
##### API Endpoint
`POST https://api.newegg.com/marketplace/reportmgmt/report/submitrequest?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ReportMgmt.SubmitReport(data);
```
[^ back to top](#table-of-contents)
### 14.2. Get Report Status
##### API Endpoint
`PUT https://api.newegg.com/marketplace/reportmgmt/report/status?sellerid={sellerid} `
##### Function
```javascript
Marketplace.ReportMgmt.GetReportStatus(data);
```
[^ back to top](#table-of-contents)

## 15. Seller Management
### 15.1. Get Industry List
##### API Endpoint
`GET https://api.newegg.com/marketplace/sellermgmt/seller/industry?sellerid={sellerid}&industrycode={industrycode} `
##### Function
```javascript
Marketplace.SellerMgmt.GetIndustry(industrycode, data);
```
[^ back to top](#table-of-contents)
### 15.2. Get Subcategory Status
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sellermgmt/seller/subcategory?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SellerMgmt.GetSubcategory(data);
```
[^ back to top](#table-of-contents)
### 15.3. Download Feed Schema
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sellermgmt/seller/feedschema?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SellerMgmt.GetSchema(data);
```
[^ back to top](#table-of-contents)
### 15.4. Get Subcategory Properties
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sellermgmt/seller/subcategoryproperty?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SellerMgmt.GetSubcategoryProperties(data);
```
[^ back to top](#table-of-contents)
### 15.5. Get Subcategory Property Values
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sellermgmt/seller/propertyvalue?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SellerMgmt.GetSubcategoryPropertyValue(data);
```
[^ back to top](#table-of-contents)

## 16. SBN (Shipped by Newegg) Management
### 16.1. Get Inbound Shipment Plan Suggestion
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sbnmgmt/inboundshipment/plansuggestion?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SBNMgmt.GetInboundShipmentPlan(data);
```
[^ back to top](#table-of-contents)
### 16.2. Submit Inbound Shipment Request
##### API Endpoint
`POST https://api.newegg.com/marketplace/sbnmgmt/inboundshipment/shipmentrequest?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SBNMgmt.SubmitInboundShipment(data);
```
[^ back to top](#table-of-contents)
### 16.3. Get Inbound Shipment Status Request
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sbnmgmt/inboundshipment/shipmentstatus?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SBNMgmt.GetInboundShipmentStatus(data);
```
[^ back to top](#table-of-contents)
### 16.4. Get Inbound Shipment Request Result
##### API Endpoint
`GET https://api.newegg.com/marketplace/sbnmgmt/inboundshipment/shipmentresult/{requestid}?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SBNMgmt.GetInboundShipmentResult(requestid, data);
```
[^ back to top](#table-of-contents)
### 16.5. Get Inbound Shipment List
##### API Endpoint
`PUT https://api.newegg.com/marketplace/sbnmgmt/inboundshipment/shipmentlist?sellerid={sellerid} `
##### Function
```javascript
Marketplace.SBNMgmt.GetInboundShipmentList(data);
```
[^ back to top](#table-of-contents)
