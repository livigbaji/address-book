const { url } = require('./config');

module.exports = {
  name: 'Create Address API Endpoint',
  item: [{
    id: 'custom-id-for-post',
    name: 'POST /address with valid request payload returns valid address response object',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 201', function () {
                pm.response.to.have.status(201);
            });`,
          `pm.test('response is valid address response', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.own.include({
                    country: 'CZ',
                    city: 'Brno',
                    street: 'Husova',
                    postalcode: '60200',
                    number: 6,
                    numberAddition: ''
                });
                pm.expect(jsonData).to.not.haveOwnProperty('_id');
                pm.expect(jsonData).to.haveOwnProperty('id');
                postman.setEnvironmentVariable('main_id', jsonData.id);
            });`,
          `pm.test('Additional properties are created', function () {
                const jsonData = pm.response.json();

                pm.expect(jsonData).to.have.any.keys(
                    'status', 'name', 'email', 
                    'createdAt', 'updatedAt', 'id'
                );
            });`,
          `pm.test('Location Header is set', function () {
                pm.response.to.have.header('Location')
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'POST',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          country: 'CZ',
          city: 'Brno',
          street: 'Husova',
          postalcode: '60200',
          number: 6,
          numberAddition: '',
        }),
      },
      url: {
        raw: `${url}/address`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          'address',
        ],
      },
    },
  },
  //
  {
    name: 'POST /address with invalid country returns error message and 422 status code',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 422', function () {
                pm.response.to.have.status(422);
            });`,
          `pm.test('response is error message', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.haveOwnProperty('error');
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'POST',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          country: 'KK',
          city: 'Brno',
          street: 'Husova',
          postalcode: '60200',
          number: 6,
          numberAddition: '',
        }),
      },
      url: {
        raw: `${url}/address`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          'address',
        ],
      },
    },
  },
  //
  {
    name: 'POST /address with invalid payload returns error message and 422 status code',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 422', function () {
                pm.response.to.have.status(422);
            });`,
          `pm.test('response is error message', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.haveOwnProperty('error')
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'POST',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          country: 'GB',
          city: '',
          street: '',
          postalcode: '',
          number: 'ggg',
          numberAddition: '',
        }),
      },
      url: {
        raw: `${url}/address`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          'address',
        ],
      },
    },
  },
  ],
};
