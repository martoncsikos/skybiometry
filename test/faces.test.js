const expect = require('chai').expect;
const faces = require('../lib/faces');

describe('.faces', () => {
  describe('#status(uids, options)', () => {
    const uids = 'testUid, testUid2';
    const options = { namespace: 'testNamespace', hack: 'random' };

    const result = faces.status(uids, options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "faces/status"', () => {
      expect(method).to.equal('faces/status');
    });
    it('sets params.uids equal to the first argument', () => {
      expect(params.uids).to.equal(uids);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.namespace).to.equal(options.namespace);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#train(uids, options)', () => {
    const uids = 'testUid, testUid2';
    const options = { namespace: 'testNamespace', hack: 'random' };

    const result = faces.train(uids, options);

    it('returns an object with keys { method, params }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
    });

    const { method, params } = result;

    it('sets the method to "faces/train"', () => {
      expect(method).to.equal('faces/train');
    });
    it('sets params.uids equal to the first argument', () => {
      expect(params.uids).to.equal(uids);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.namespace).to.equal(options.namespace);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#group(uids, options)', () => {
    const uids = 'testUid, testUid2';
    const options = {
      files: 'path/to/photo',
      urls: 'testUrl,testUrl2',
      namespace: 'testNamespace',
      detector: 'Normal',
      attributes: 'gender,glasses',
      threshold: 60,
      limit: 20,
      return_similarities: true,
      detect_all_feature_points: true,
      hack: 'random',
    };

    const result = faces.group(uids, options);

    it('returns an object with keys { method, params, files }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
      expect(result).to.have.property('files');
    });

    const { method, params, files } = result;

    it('sets the method to "faces/group"', () => {
      expect(method).to.equal('faces/group');
    });
    it('sets params.uids equal to the first argument', () => {
      expect(params.uids).to.equal(uids);
    });
    it('sets params.urls equal to options.urls', () => {
      expect(params.urls).to.equal(options.urls);
    });
    it('sets files equal to options.files', () => {
      expect(files).to.equal(options.files);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.namespace).to.equal(options.namespace);
      expect(params.detector).to.equal(options.detector);
      expect(params.attributes).to.equal(options.attributes);
      expect(params.threshold).to.equal(options.threshold);
      expect(params.limit).to.equal(options.limit);
      expect(params.return_similarities).to.equal(options.return_similarities);
      expect(params.detect_all_feature_points).to.equal(options.detect_all_feature_points);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#detect(options)', () => {
    const options = {
      files: 'path/to/file',
      urls: 'testUrl,testUrl2',
      detector: 'Normal',
      attributes: 'gender,glasses',
      detect_all_feature_points: true,
      hack: 'random',
    };

    const result = faces.detect(options);

    it('returns an object with keys { method, params, files }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
      expect(result).to.have.property('files');
    });

    const { method, params, files } = result;

    it('sets the method to "faces/detect"', () => {
      expect(method).to.equal('faces/detect');
    });
    it('sets params.urls equal to options.urls', () => {
      expect(params.urls).to.equal(options.urls);
    });
    it('sets files equal to options.files', () => {
      expect(files).to.equal(options.files);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.detector).to.equal(options.detector);
      expect(params.attributes).to.equal(options.attributes);
      expect(params.detect_all_feature_points).to.equal(options.detect_all_feature_points);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });

  describe('#recognize(uids, options)', () => {
    const uids = 'testUid, testUid2';
    const options = {
      urls: 'testUrl,testUrl2',
      detector: 'Normal',
      attributes: 'gender,glasses',
      detect_all_feature_points: true,
      hack: 'random',
    };

    const result = faces.recognize(uids, options);

    it('returns an object with keys { method, params, files }', () => {
      expect(result).to.be.an('object');
      expect(result).to.have.property('method');
      expect(result).to.have.property('params');
      expect(result).to.have.property('files');
    });

    const { method, params, files } = result;

    it('sets the method to "faces/recognize"', () => {
      expect(method).to.equal('faces/recognize');
    });
    it('sets params.uids equal to the first argument', () => {
      expect(params.uids).to.equal(uids);
    });
    it('sets params.urls equal to options.urls', () => {
      expect(params.urls).to.equal(options.urls);
    });
    it('sets files equal to options.files', () => {
      expect(files).to.equal(options.files);
    });
    it('sets optional params equal to the second argument', () => {
      expect(params.namespace).to.equal(options.namespace);
      expect(params.detector).to.equal(options.detector);
      expect(params.attributes).to.equal(options.attributes);
      expect(params.limit).to.equal(options.limit);
      expect(params.detect_all_feature_points).to.equal(options.detect_all_feature_points);
    });
    it('doesn\'t set unallowed parameters passed in options', () => {
      expect(params).to.not.have.property('hack');
    });
  });
});
