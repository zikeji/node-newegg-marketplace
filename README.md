### WARNING

This package is not ready yet! Please wait for 1.0.0.
## Newegg Marketplace API Module

This plugin wraps requests to the Newegg Marketplace API with required headers. The concept is simple, following their [developer guide](https://sellerportal.newegg.com/Guideline/Newegg_Marketplace_API_DeveloperGuide.zip) you can make a query to the resource URL specified.

Essentially all the module accomplishes is allow you to make queries to their API without needing to create an https request each time. It looks prettier and is a bit more readable (in my opinion).

You still need to use the developer guide to figure out what data it wants and what sort of response you should expect.

### Notice

This is a simple wrapper, I have not tested every single API function Newegg has to offer.

### Failover

This plugin will handle failover, per **8.2. Failover Endpoints for API Service** in the developer guide. You can disable this functionality by passing a 4th parameter, `false`, when constructing `NeweggMarketplaceAPI`. Failover functionality isn't smart, it works per request.

### Example
```javascript
const NeweggMarketplaceAPI = require('newegg-marketplace');

const marketplace = new NeweggMarketplaceAPI('A006', '727ddc0678f4d115bd544aff46bc15634', '1B6B1383-01D1-4A1E-BA53-05DECE9BD765');

marketplace.contentmgmt
  .servicestatus()
  .then(console.log)
  .catch(console.error);

marketplace.contentmgmt.item.inventory('POST', {
    type: 0,
    value: 'example',
    condition: 6,
  })
  .then(console.log)
  .catch(console.error);
```

### Service Status

Requesting the service status as described in the documentation can be seen in the example above. Keep in mind this Node.js library will automatically make it a "GET" request so no parameters are necessary.

### Additional Notes

#### Request Type

You are essentially typing a URL when using this library, but instead replacing the slash (`/`) with a period (`.`). For example, `https://api.newegg.com/marketplace/contentmgmt/item/inventory` becomes `marketplace.contentmgmt.item.inventory`. You still need to specify the request type (with the exception of `servicestatus`), which is the first parameter.

##### Example

```javascript
marketplace.your.api.endpoint(METHOD, DATA);
```

#### Errors are your friend!

Newegg returns very descriptive errors. If you can't figure out how to format the data in a request, refer to the error you're getting. You should be able to solve it with some tinkering.

#### Wrong JSON Documentation in the Newegg Marketplace API Developer Guide

The current documentation has some errors and at times you'll be forced to go over the XML version of a request in order to figure out how to do the JSON version of the request. Note, even though the request body "requires" the "NeweggAPIRequest" element, you actually need to exclude it in the JSON, it only needs to be there for the XML.

#### Raw Query