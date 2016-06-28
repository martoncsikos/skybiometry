const rp = require('request-promise');
const fs = require('fs');
const _ = require('lodash/object');

const account = require('./account');
const tags = require('./tags');
const faces = require('./faces');

const privateData = new WeakMap();

module.exports = class SkyBiometryClient {
  constructor(apiKey, apiSecret) {
    if (!apiKey) {
      throw new Error('Tried to initialize SkyBiometry client without API key');
    }

    privateData.set(this, { apiKey, apiSecret });

    // TODO: Find a more readable solution
    const mapMethods = (methods) =>
      _.mapValues(methods, (method) => (...args) => this.callMethod(method(...args)));

    this.account = mapMethods(account);
    this.tags = mapMethods(tags);
    this.faces = mapMethods(faces);
  }

  callMethod({ method, params = {}, files }) {
    const baseUrl = 'https://api.skybiometry.com/fc/';
    const formData = {
      api_key: privateData.get(this).apiKey,
      api_secret: privateData.get(this).apiSecret,
    };

    _.assign(formData, params);

    if (files) {
      formData.files = (typeof files === 'string') ? fs.createReadStream(files) : files;
    }

    return rp.post({
      baseUrl,
      uri: method,
      formData,
    });
  }
};
