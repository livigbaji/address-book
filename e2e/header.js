const { url } = require('./config');

module.exports = {
  name: 'Content-type header Check',
  item: [{
    name: 'GET / with content-type: application/JSON returns 200 status code',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
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
        raw: `${url}/`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          '',
        ],
      },
    },
  },
  //
  {
    name: 'GET / with content-type: text/html returns 415 status code',
    event: [{
      listen: 'test',
      script: {
        exec: [
          `pm.test('status code is 415', function () {
                            pm.response.to.have.status(415);
                        });`,
          `pm.test("response comes with error message", function () {
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
        value: 'text/html',
      }],
      url: {
        raw: `${url}/`,
        protocol: 'http',
        host: [
          url,
        ],
        path: [
          '',
        ],
      },
    },
  },
  ],
};
