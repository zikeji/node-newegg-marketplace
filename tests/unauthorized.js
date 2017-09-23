var assert = require('assert');
var NeweggMarketplaceAPI = require('../out/src');

var Marketplace = new NeweggMarketplaceAPI('A006', '727ddc0678f4d115bd544aff46bc15634', '1B6B1383-01D1-4A1E-BA53-05DECE9BD765');

describe('Marketplace', function() {
  describe('SellerMgmt', function() {
    describe('SellerStatusCheck', function() {
      it('should fail with an error code "InvalidToken" from Newegg', function() {
        return Marketplace.SellerMgmt
          .SellerStatusCheck('contentmgmt')
          .then(function() {
            assert.ok(false, "This function should never succeed because I'm using invalid Newegg API credentials and they don't have a sandbox.");
          })
          .catch(function(err) {
            assert.equal(err[0].Code, 'InvalidToken');
          });
      });
    });
  });
});
