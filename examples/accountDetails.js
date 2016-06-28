/*
  Gets account information and logs it to the console.
  Make sure you've set up your API key and secret and a test namespace in
  the SkyBiometry console and added them to config.js.
*/

const config = require('./config');
const skybiometry = require('../index.js');

const client = new skybiometry.Client(config.apiKey, config.apiSecret);

/* eslint-disable no-console */
console.log('Running...');
Promise.all([
  client.account.authenticate(),
  client.account.limits(),
  client.account.namespaces(),
  client.account.users(config.namespace),
])
.then(results => {
  const parsedResults = results.map(result => JSON.parse(result));
  const authenticated = JSON.stringify(parsedResults[0].authenticated, null, 2);
  const usage = JSON.stringify(parsedResults[1].usage, null, 2);
  const namespaces = JSON.stringify(parsedResults[2].namespaces, null, 2);
  const users = JSON.stringify(parsedResults[3].users, null, 2);

  console.log(`Authenticated: ${authenticated}`);
  console.log(`Quota usage: ${usage}`);
  console.log(`Namespaces: ${namespaces}`);
  console.log(`Users in ${config.namespace}: ${users}`);
})
.catch(err => console.log(`ERROR: ${err}`));
