/* eslint-disable no-console */
const mongoose = require('mongoose');

const {
  DBUSER,
  DBPASSWORD,
  DBNAME,
  DBPORT,
  DBHOST,
  DBPROTOCOL,
  DBOPTIONS,
} = process.env;

const passwordSection = DBPASSWORD ? `${encodeURIComponent(DBPASSWORD)}@` : '';
const userSection = DBUSER ? `${encodeURIComponent(DBUSER)}:` : '';
const hostPortSection = DBPORT ? `${DBHOST}:${DBPORT}` : DBHOST;
const options = DBOPTIONS ? `?${DBOPTIONS}` : '';
const connectionString = `${DBPROTOCOL || 'mongodb'}://${userSection}${passwordSection}${hostPortSection}/${DBNAME}${options}`;

const connection = mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    console.log('Database connected now!');
    if (process.send) {
      process.send('ready');
    }
  })
  .catch(() => {
    console.error('An error occured while trying to connect with the database');
    process.exit(0);
  });

mongoose.connection.once('disconnected', () => {
  console.log('Database disconnected');
  // process.exit(0);
});

module.exports = connection;
