/* eslint-disable global-require */

// eslint-disable-next-line import/no-extraneous-dependencies
const Newman = require('newman');

// call newman.run to pass `options` object and wait for callback
Newman.run({
  collection: {
    info: {
      name: 'Address API',
      description: 'Test Suite to test addresses',
    },
    item: [
      require('./header'),
      require('./create-address'),
      require('./get-address'),
      require('./update-address'),
      require('./delete-address'),
    ],
  },
  reporters: 'cli',
}, (err) => {
  if (err) {
    throw err;
  }
}).on('console', (exception) => {
  // eslint-disable-next-line no-console
  console.log({
    exception,
  });
});
