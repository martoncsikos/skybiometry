const config = require('./config');
const skybiometry = require('../index.js');

const client = new skybiometry.Client(config.apiKey, config.apiSecret);
const filePath = './assets/multiple_faces.jpg';


const detectedUsers = [];

/* eslint-disable no-console */
console.log('Running...');
// Detect faces in photo
client.faces.detect({ files: filePath })
// Get temporary tagIds for detected faces
.then(result => JSON.parse(result).photos[0].tags.map(tag => tag.tid))
.then(tags => {
  // Generate userId for each tag and save them
  const saveTags = tags.map((tag, i) => {
    const userId = `Person${i + 1}`;
    detectedUsers.push(userId);
    return client.tags.save(tag, userId, { namespace: config.namespace });
  });
  return Promise.all(saveTags);
})
// Train detected Users
.then(() => client.faces.train(detectedUsers.join(','), { namespace: config.namespace }))
// Log results
.then(result => console.log(`Face enrollment completed: ${result}`))
.catch(err => console.log(`ERROR: ${err}`));
