const { url } = require('./config');

module.exports = {
  name: 'Update Address API Endpoint',
  item: [{
    name: 'PATCH /address/:address with non-existing id returns 404 and error message',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 404', function () {
                pm.response.to.have.status(404);
            });`,
          `pm.test('Reponse is error message', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.haveOwnProperty('error');
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'PATCH',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          status: 'not at home',
          name: 'I am Iron man',
          email: 'tony@avengers.com',
        }),
      },
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
    name: 'PATCH /address/:address with invalid status returns error message and 422 status code',
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
      method: 'PATCH',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          status: 'off fighting thanos',
          name: 'I am Iron man',
          email: 'tony@avengers.com',
        }),
      },
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
    name: 'PATCH /address with invalid payload returns error message and 422 status code',
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
      method: 'PATCH',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          status: 'not at home',
          name: '',
          email: 'antman',
        }),
      },
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
    name: 'PATCH /address/:address with existing id returns 200 and updated address',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 200', function () {
                pm.response.to.have.status(200);
            });`,
          `pm.test('Address is updated', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData.id).to.eql(postman.getEnvironmentVariable('main_id'));
                pm.expect(jsonData).to.haveOwnProperty('id');
                pm.expect(jsonData).to.not.haveOwnProperty('_id');
                pm.expect(jsonData).to.own.include({
                  status: 'interested',
                  name: 'I am Iron man',
                  email: 'tony@avengers.com',
                });
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'PATCH',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          status: 'interested',
          name: 'I am Iron man',
          email: 'tony@avengers.com',
        }),
      },
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
  //
  {
    name: 'PATCH /address/:address with status as \'interested\' cannot be further updated, returns 403',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 403', function () {
                pm.response.to.have.status(403);
            });`,
          `pm.test('Response is error message', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.haveOwnProperty('error');
            });`,
        ],
        type: 'text/javascript',
      },
    }],
    request: {
      method: 'PATCH',
      header: [{
        key: 'Content-Type',
        value: 'application/json',
      }],
      body: {
        mode: 'raw',
        raw: JSON.stringify({
          status: 'not at home',
          name: 'I am Iron man',
          email: 'tony@avengers.com',
        }),
      },
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
