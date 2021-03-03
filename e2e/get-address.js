const { url } = require('./config');

module.exports = {
  name: 'Get address endpoint test',
  item: [{
    name: 'GET /address returns an array with 200 status code',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
           });`,
          `pm.test('Response is an array', function () {
                const jsonData = pm.response.json();

                pm.expect(jsonData).to.be.an('array');
                const [first] = jsonData;
                if(first) {
                  pm.expect(first).to.haveOwnProperty('id');
                  pm.expect(first).to.not.haveOwnProperty('_id');
                }
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'GET',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
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
    name: 'GET /address/:address returns an error message with 404 status code for non-existing id',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test("Status code is 404", function () {
                pm.response.to.have.status(404);
           });`,
          `pm.test('Response is an error', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.haveOwnProperty('error');
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'GET',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      url: {
        raw: `${url}/address/581b5b28f3bc7b88210c4fe2`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          'address',
          '581b5b28f3bc7b88210c4fe2',
        ],
      },
    },
  },
  //
  {
    name: 'GET /address/:address returns an address object with 200 status code for existing id',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
           });`,
          `pm.test('Response is an object', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.be.an('object')
                pm.expect(jsonData).to.haveOwnProperty('id');
                pm.expect(jsonData).to.not.haveOwnProperty('_id');
                pm.expect(jsonData.id).to.eql(postman.getEnvironmentVariable('main_id'));
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'GET',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      url: {
        raw: `${url}/address/{{main_id}}`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          'address',
          '{{main_id}}',
        ],
      },
    },
  },
  ],
};
