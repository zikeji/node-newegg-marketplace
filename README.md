## Newegg Marketplace API Module

This plugin wraps requests to the Newegg Marketplace API with required headers. The concept is simple, follow their [developer guide](https://sellerportal.newegg.com/Guideline/Newegg_Marketplace_API_DeveloperGuide.zip) and call the relevant functions in this library.

### A Note

All this library does is wrap the requests and expose functions that (can make) your code prettier and more readable. It does not error check or validate to any of the standards as the Newegg developer guide provides, nor does it do formatting (outside of URL parameters) for the data you're giving to Newegg.

### Failover

This plugin will handle failover, per **8.2. Failover Endpoints for API Service** in the developer guide. You can disable this functionality by passing a 4th parameter, `false`, when constructing `NeweggMarketplaceAPI`. Failover functionality isn't smart, it works per request.

### Example
```javascript
const NeweggMarketplaceAPI = require('newegg-marketplace');

const Marketplace = new NeweggMarketplaceAPI('A006', '727ddc0678f4d115bd544aff46bc15634', '1B6B1383-01D1-4A1E-BA53-05DECE9BD765');

Marketplace.SellerMgmt
  .SellerStatusCheck('contentmgmt')
  .then(console.log)
  .catch(console.error);

Marketplace.ContentMgmt
  .GetManufacturer({
    OperationType: 'GetManufacturerRequest',
    RequestBody: {
      PageIndex: 1,
      PageSize: 10,
      RequestCriteria: {},
    },
  })
  .then(console.log)
  .catch(console.error);
```

### Additional Notes

#### Errors are your friend!

Newegg returns very descriptive errors. If you can't figure out how to format the data in a request, refer to the error you're getting. You should be able to solve your issue.

#### Wrong JSON Documentation in the Newegg Marketplace API Developer Guide

The current documentation has some errors and at times you'll be forced to go over the XML version of a request in order to figure out how to do the JSON version of the request. Note, even though the request body "requires" the "NeweggAPIRequest" element, you actually need to exclude it in the JSON, it only needs to be there for the XML.