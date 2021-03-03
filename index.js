require('dotenv').config();
require('./connection');

const express = require('express');
const bodyParser = require('body-parser');
const findAndDeletAddressRoutes = require('./routes/find-address.route');
const createAddressRoute = require('./routes/create-address.route');
const updateAddressRoute = require('./routes/update-address.route');
const jsonOnlyHeader = require('./middlewares/header.middleware');

const port = process.env.PORT || 4000;
const app = express();

app.use(jsonOnlyHeader);

app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());

app.all('/', (req, res) => res.json({
  status: 'online',
  date: (new Date()).toString(),
}));

app.use('/address',
  findAndDeletAddressRoutes,
  updateAddressRoute,
  createAddressRoute);

// Middleware for catching unhandled controller errors

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.toString() === '[object Object]') {
    res.status(409).json({
      error: err,
    });
  } else {
    res.status(500).json({
      error: err.toString(),
    });
  }
});

// 404 catch route
app.use('*', (req, res) => res.status(404).json({
  error: `cannot ${req.method} ${req.originalUrl}`,
}));

// unhandled error route
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
});

// starts the server
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Enterprise online at port: ${port}`);
});
