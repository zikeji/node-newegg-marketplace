## Newegg Marketplace API Module

This plugin wraps requests to the Newegg Marketplace API with required headers. The concept is simple, following their [developer guide](https://sellerportal.newegg.com/Guideline/Newegg_Marketplace_API_DeveloperGuide.zip) you can make a query to the resource URL specified.

Essentially all the module accomplishes is allow you to make queries to their API without needing to use [request](https://www.npmjs.com/package/request) each time with an options object that includes your headers. So it looks prettier and is a bit more readable.

You still need to use the developer guide to figure out what data it wants and what sort of response you should expect.

### Example
```javascript
const NeweggMarketplaceAPI = require('newegg-marketplace');

const marketplace = new NeweggMarketplaceAPI('A006', '727ddc0678f4d115bd544aff46bc15634', '1B6B1383-01D1-4A1E-BA53-05DECE9BD765');

newegg.contentmgmt
  .servicestatus()
  .then(console.log)
  .catch(console.error);

newegg.contentmgmt.item.inventory({
    type: 0,
    value: 'example',
    condition: 6,
  })
  .then(console.log)
  .catch(console.error);
```