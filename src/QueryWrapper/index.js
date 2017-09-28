'use strict';

import rp from 'request-promise-native';

export default class QueryWrapper {
  constructor(sellerId, authorization, secretKey, timeout, failover) {
    this._sellerId = sellerId;
    this._authorization = authorization;
    this._secretKey = secretKey;
    this._failover = failover || true;
    this._apiUrls = ['https://api.newegg.com', 'https://api01.newegg.com', 'https://api02.newegg.com'];
    this._apiVersion = 304;
    this._rp = rp.defaults({
      timeout: timeout || 15 * 1000,
      headers: {
        Authorization: this._authorization,
        SecretKey: this._secretKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      json: true,
    });
  }

  query(method, endpoint, data, queryParams, apiUrlIndex) {
    const _this = this;
    if (!queryParams) queryParams = null;
    if (!apiUrlIndex) apiUrlIndex = 0;
    return new Promise((resolve, reject) => {
      const options = {
        method,
        uri: `${_this._apiUrls[apiUrlIndex]}${endpoint}?sellerid=${_this._sellerId}&version=${_this._apiVersion}`,
      };
      if (queryParams && queryParams.length > 0) {
        queryParams.forEach(queryParam => {
          options.uri += `&${queryParam.param}=${encodeURIComponent(queryParam.value)}`;
        });
      }
      if (data) options.body = data;
      _this
        ._rp(options)
        .then(response => {
          if (typeof response === 'string') {
            resolve(JSON.parse(response.trim()));
          } else {
            resolve(response);
          }
        })
        .catch(response => {
          if (response.error && response.error.code && response.error.code === 'ETIMEDOUT') {
            apiUrlIndex += 1;
            if (this._failover && _this._apiUrls[apiUrlIndex]) {
              _this
                .query(method, endpoint, data, queryParams, apiUrlIndex)
                .then(resolve)
                .catch(reject);
            } else {
              reject(response.error);
            }
          } else {
            reject(response.error);
          }
        });
    });
  }
}
