module.exports = {
  users(namespaces) {
    const method = 'account/users';
    const params = { namespaces };
    return { method, params };
  },

  namespaces() {
    const method = 'account/namespaces';
    return { method };
  },

  limits() {
    const method = 'account/limits';
    return { method };
  },

  authenticate() {
    const method = 'account/authenticate';
    return { method };
  },
};
