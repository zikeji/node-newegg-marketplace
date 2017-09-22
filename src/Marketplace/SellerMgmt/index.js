'use strict';

export default class SellerMgmt {
  constructor(QueryWrapper) {
    this.QueryWrapper = QueryWrapper;
  }

  SellerStatusCheck(domain, data) {
    return this.QueryWrapper.query('GET', `/marketplace/${domain}/servicestatus`, data);
  }
  GetIndustry(industrycode, data) {
    return this.QueryWrapper.query('GET', '/marketplace/sellermgmt/seller/industry', data, [
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