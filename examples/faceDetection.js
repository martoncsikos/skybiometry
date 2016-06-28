const config = require('./config');
const skybiometry = require('../index.js');

const client = new skybiometry.Client(config.apiKey, config.apiSecret);
const filePath = './assets/multiple_faces.jpg';

/* eslint-disable no-console */
console.log('Running...');
client.faces.detect({ files: filePath })
.then(result => {
  const faces = JSON.parse(result).photos[0].tags.map(tag => {
    const face = {
      width: tag.width,
      height: tag.height,
      center: tag.center,
    };
    return face;
  });
  console.log(`Detected faces: ${JSON.stringify(faces, null, 2)}`);
})
.catch(err => console.log(`ERROR: ${err}`));
