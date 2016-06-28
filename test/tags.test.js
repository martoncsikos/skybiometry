const expect = require('chai').expect;
const tags = require('../lib/tags');

describe('.tags', () => {
  describe('#save(tids, uid, options)', () => {
    const tids = 'testTagId1,testTagId2';
    const uid = 'testUserId';
    const options = {
      namespace: 'testNamespace',
      label: 'testLabel',
      password: 'testPassword',
      hack: 'random',
    };

    const result = tags.save(tids, uid, options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "tags/save"', () => {
      expect(method).to.equal('tags/save');
    });
    it('sets params.tids equal to the first argument', () => {
      expect(params.tids).to.equal(tids);
    });
    it('sets params.uid equal to the second argument', () => {
      expect(params.uid).to.equal(uid);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.namespace).to.equal(options.namespace);
      expect(params.label).to.equal(options.label);
      expect(params.password).to.equal(options.password);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#get(options)', () => {
    const options = {
      uids: 'testUid, testUid2',
      pids: 'testPid, testPid2',
      urls: 'testUrl',
      limit: 20,
      together: false,
      order: 'recent',
      namespace: 'testNamespace',
      filter: 'testFilter',
      hack: 'random',
    };

    const result = tags.get(options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "tags/get"', () => {
      expect(method).to.equal('tags/get');
    });
    it('sets params.uids equal to options.uids', () => {
      expect(params.uids).to.equal(options.uids);
    });
    it('sets params.pids equal to options.pids', () => {
      expect(params.pids).to.equal(options.pids);
    });
    it('sets params.urls equal to options.urls', () => {
      expect(params.urls).to.equal(options.urls);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.limit).to.equal(options.limit);
      expect(params.together).to.equal(options.together);
      expect(params.order).to.equal(options.order);
      expect(params.namespace).to.equal(options.namespace);
      expect(params.filter).to.equal(options.filter);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#remove(tids, options)', () => {
    const tids = 'testTagId1,testTagId2';
    const options = {
      password: 'testPassword',
      hack: 'random',
    };

    const result = tags.remove(tids, options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "tags/remove"', () => {
      expect(method).to.equal('tags/remove');
    });
    it('sets params.tids equal to the first argument', () => {
      expect(params.tids).to.equal(tids);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.password).to.equal(options.password);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#remove(tids, options)', () => {
    const tids = 'testTagId1,testTagId2';
    const options = {
      password: 'testPassword',
      hack: 'random',
    };

    const result = tags.remove(tids, options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "tags/remove"', () => {
      expect(method).to.equal('tags/remove');
    });
    it('sets params.tids equal to the first argument', () => {
      expect(params.tids).to.equal(tids);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.password).to.equal(options.password);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#add(uid, url, tag, options)', () => {
    const uid = 'testUserId';
    const url = 'testUrl';
    const tag = {
      x: 10,
      y: 10,
      width: 10,
      height: 10,
      hack: 'random',
    };
    const options = {
      label: 'testLabel',
      password: 'testPassword',
      hack: 'random',
    };

    const result = tags.add(uid, url, tag, options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "tags/add"', () => {
      expect(method).to.equal('tags/add');
    });
    it('sets params.uid equal to the first argument', () => {
      expect(params.uid).to.equal(uid);
    });
    it('sets params.url equal to the second argument', () => {
      expect(params.url).to.equal(url);
    });
    it('sets tag parameters equal to the third argument', () => {
      expect(params.x).to.equal(tag.x);
      expect(params.y).to.equal(tag.y);
      expect(params.width).to.equal(tag.width);
      expect(params.height).to.equal(tag.height);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.label).to.equal(options.label);
      expect(params.password).to.equal(options.password);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });
});
