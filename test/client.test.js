const expect = require('chai').expect;
const fs = require('fs');
const Request = require('request-promise').Request;

const Client = require('../lib/client');

describe('Client', () => {
  it('throws an error if instantiated without an apiKey', () => {
    expect(() => new Client()).to.throw();
  });

  const apiKey = 'testKey';
  const apiSecret = 'testSecret';
  const client = new Client(apiKey, apiSecret);

  describe('#callMethod(options)', () => {
    const method = 'test/method';
    const params = { param1: 'value1', param2: 'value2' };
    const fileBuffer = new Buffer([1, 2, 3]);
    const filePath = `${__dirname}/../examples/assets/single_face.jpg`;
    const fileStream = fs.createReadStream(filePath);

    const call = client.callMethod({ method, params });
    const payload = call.formData;

    it('returns an instance of Request', () => {
      expect(call).to.be.an.instanceof(Request);
    });

    it('sets the URI host and path', () => {
      expect(call.uri.host).to.equal('api.skybiometry.com');
      expect(call.uri.pathname).to.equal(`/fc/${method}`);
    });

    it('sets the apiKey and apiSecret', () => {
      expect(payload.api_key).to.equal(apiKey);
      expect(payload.api_secret).to.equal(apiSecret);
    });

    it('sets the request parameters', () => {
      expect(payload.param1).to.equal(params.param1);
      expect(payload.param2).to.equal(params.param2);
    });

    it('sets the file parameter to a ReadStream if file is a ReadStream', () => {
      const file = client.callMethod({ method, params, files: fileStream }).formData.files;
      expect(file).to.be.an.instanceOf(fs.ReadStream);
    });

    it('sets the file parameter to a ReadStream if file is a path', () => {
      const file = client.callMethod({ method, params, files: filePath }).formData.files;
      expect(file).to.be.an.instanceOf(fs.ReadStream);
    });

    it('sets the file parameter to a Buffer if file is a Buffer', () => {
      const file = client.callMethod({ method, params, files: fileBuffer }).formData.files;
      expect(file).to.be.an.instanceOf(Buffer);
    });
  });
});
