'use strict';

export default class SellerMgmt {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  SellerStatusCheck() {
    return this.QueryWrapper.query('GET', '/marketplace/sellermgmt/seller/accountstatus', null);
  }
  GetIndustry(industrycode) {
    return this.QueryWrapper.query('GET', '/marketplace/sellermgmt/seller/industry', null, [
      {
        param: 'industrycode',
        value: industrycode,
      },
    ]);
  }
  GetSubcategory(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sellermgmt/seller/subcategory', data);
  }
  GetSchema(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sellermgmt/seller/feedschema', data);
  }
  GetSubcategoryProperties(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sellermgmt/seller/subcategoryproperty', data);
  }
  GetSubcategoryPropertyValue(data) {
    return this.QueryWrapper.query('PUT', '/marketplace/sellermgmt/seller/propertyvalue', data);
  }
}