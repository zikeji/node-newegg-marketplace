'use strict';

import rp from 'request-promise-native';

export default class querywrapper {
  constructor(sellerId, authorization, secretKey, failover) {
    this._sellerId = sellerId;
    this._authorization = authorization;
    this._secretKey = secretKey;
    this._failover = failover || true;
    this._apiUrls = ['https://api.newegg.com/marketplace', 'https://api01.newegg.com/marketplace', 'https://api02.newegg.com/marketplace'];
    this._apiVersion = 304;
    this._rp = rp.defaults({
      timeout: 15 * 1000,
      headers: {
        Authorization: this._authorization,
        SecretKey: this._secretKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      json: true,
    });
  }

  query(method, endpoint, data, apiUrlIndex) {
    const _this = this;
    if (!apiUrlIndex) apiUrlIndex = 0;
    return new Promise((resolve, reject) => {
      const options = {
        method,
        uri: `${_this._apiUrls[apiUrlIndex]}${endpoint}?sellerid=${_this._sellerId}&version=${_this._apiVersion}`,
      };
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
            ++apiUrlIndex;
            if (_this._apiUrls[apiUrlIndex]) {
              _this
                ._query(method, endpoint, data, apiUrlIndex)
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
