const _ = require('lodash/object');

module.exports = {
  status(uids, options = {}) {
    const method = 'faces/status';
    const params = { uids };

    _.assign(params, _.pick(options, ['namespace']));

    return { method, params };
  },

  train(uids, options = {}) {
    const method = 'faces/train';
    const params = { uids };

    _.assign(params, _.pick(options, ['namespace']));

    return { method, params };
  },

  group(uids, options = {}) {
    const method = 'faces/group';
    const params = { uids };
    let files;

    if (options.files) files = options.files;

    _.assign(params,
      _.pick(options, [
        'urls',
        'namespace',
        'detector',
        'attributes',
        'threshold',
        'limit',
        'return_similarities',
        'detect_all_feature_points',
      ])
    );

    return { method, params, files };
  },

  recognize(uids, options = {}) {
    const method = 'faces/recognize';
    const params = { uids };
    let files;

    if (options.files) files = options.files;

    _.assign(params,
      _.pick(options, [
        'urls',
        'namespace',
        'detector',
        'attributes',
        'limit',
        'detect_all_feature_points',
      ])
    );

    return { method, params, files };
  },

  detect(options = {}) {
    const method = 'faces/detect';
    const params = { };
    let files;

    if (options.files) files = options.files;

    _.assign(params,
      _.pick(options, [
        'urls',
        'detector',
        'attributes',
        'detect_all_feature_points',
      ])
    );
    return { method, params, files };
  },
};
