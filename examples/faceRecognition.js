const config = require('./config');
const skybiometry = require('../index.js');

const client = new skybiometry.Client(config.apiKey, config.apiSecret);
const filePath = './assets/single_face.jpg';

/* eslint-disable no-console */
console.log('Running...');
client.faces.recognize('all', { files: filePath, namespace: config.namespace })
.then(result => {
  console.log('Face recognition complete. Found similarities:');
  console.log(JSON.parse(result).photos[0].tags[0].uids);
})
.catch(err => console.log(`ERROR: ${err}`));
