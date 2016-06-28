const expect = require('chai').expect;
const account = require('../lib/account');

describe('.account', () => {
  describe('#users(namespaces)', () => {
    const namespaces = 'testNamespace1,testNamespace2';

    const result = account.users(namespaces);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "account/users"', () => {
      expect(method).to.equal('account/users');
    });
    it('sets params.namespaces equal to the first argument', () => {
      expect(params.namespaces).to.equal(namespaces);
    });
  });

  describe('#namespaces()', () => {
    const result = account.namespaces();

    it('returns an object with keys { method }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
    });

    const { method } = result;

    it('sets the method to "account/namespaces"', () => {
      expect(method).to.equal('account/namespaces');
    });
  });

  describe('#limits()', () => {
    const result = account.limits();

    it('returns an object with keys { method }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
    });

    const { method } = result;

    it('sets the method to "account/limits"', () => {
      expect(method).to.equal('account/limits');
    });
  });

  describe('#authenticate()', () => {
    const result = account.authenticate();

    it('returns an object with keys { method }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
    });

    const { method } = result;

    it('sets the method to "account/authenticate"', () => {
      expect(method).to.equal('account/authenticate');
    });
  });
});
