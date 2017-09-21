'use strict';

import rp from 'request-promise-native';

export default class querywrapper {
  constructor(sellerId, authorization, secretKey, apiUrl) {
    this._sellerId = sellerId;
    this._authorization = authorization;
    this._secretKey = secretKey;
    this._apiUrl = apiUrl;
    this._apiVersion = 304;
  }

  _query(method, endpoint, data) {
    const _this = this;
    return new Promise((resolve, reject) => {
      const options = {
        method,
        uri: `${_this._apiUrl}${endpoint}?sellerid=${_this._sellerId}&version=${_this._apiVersion}`,
        headers: {
          Authorization: _this._authorization,
          SecretKey: _this._secretKey,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        json: true,
      };
      if (data) options.body = data;
      rp(options)
        .then(response => {
          resolve(response);
        })
        .catch(response => {
          reject(response.error);
        });
    });
  }

  get(endpoint, data) {
    return this._query('GET', endpoint, data);
  }

  post(endpoint, data) {
    return this._query('POST', endpoint, data);
  }

  put(endpoint, data) {
    return this._query('PUT', endpoint, data);
  }

  delete(endpoint, data) {
    return this._query('DELETE', endpoint, data);
  }
}
