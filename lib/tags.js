const _ = require('lodash/object');

module.exports = {
  remove(tids, options = {}) {
    const method = 'tags/remove';
    const params = { tids };

    _.assign(params, _.pick(options, ['password']));

    return { method, params };
  },

  save(tids, uid, options = {}) {
    const method = 'tags/save';
    const params = { tids, uid };

    _.assign(params, _.pick(options, ['namespace', 'label', 'password']));

    return { method, params };
  },

  add(uid, url, tag, options = {}) {
    const method = 'tags/add';
    const params = { uid, url };

    _.assign(params, _.pick(tag, ['x', 'y', 'width', 'height']));
    _.assign(params, _.pick(options, ['label', 'password']));

    return { method, params };
  },

  get(options = {}) {
    const method = 'tags/get';
    const params = {};

    _.assign(params,
      _.pick(options, [
        'urls',
        'uids',
        'pids',
        'order',
        'limit',
        'together',
        'filter',
        'namespace',
      ])
    );

    return { method, params };
  },
};
