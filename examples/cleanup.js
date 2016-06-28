const config = require('./config');
const skybiometry = require('../index.js');

const client = new skybiometry.Client(config.apiKey, config.apiSecret);

/* eslint-disable no-console */
console.log('Running...');
// Get all userIds for test namespace
client.account.users(config.namespace)
.then(result => JSON.parse(result).users[config.namespace].join(','))
// Get tags for userIds
.then(uids => client.tags.get({ uids, limit: 20 }))
.then(result => {
  const tags = [];
  JSON.parse(result).photos.forEach(photo => {
    photo.tags.forEach(tag => tags.push(tag.tid));
  });
  return tags.join(',');
})
// Remove all tags
.then(tags => client.tags.remove(tags))
// Re-train faces
.then(result => {
  console.log(`Removed ${JSON.parse(result).removed_tags.length} tags.`);
  return client.faces.train('all', { namespace: config.namespace });
})
.then(() => console.log(`Model re-trained. Users removed from ${config.namespace}.`))
.catch(err => console.log(`ERROR: ${err}`));
