const { url } = require('./config');

module.exports = {
  name: 'Delete Endpoint test',
  item: [
    {
      name: 'DELETE /address/:address returns an error message with 404 status code for non-existing id',
      event: [{
        listen: 'test',
        script: {
          exec: [
            `pm.test("Status code is 404", function () {
                pm.response.to.have.status(404);
           });`,
            `pm.test('Response is an error message', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.haveOwnProperty('error');
            });`,
          ],
          type: 'text/javascript',
        },
      }],
      request: {
        method: 'DELETE',
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
      name: 'DELETE /address/:address returns an empty body with 200 status code for existing id',
      event: [{
        listen: 'test',
        script: {
          exec: [
            `pm.test("Status code is 200", function () {
                pm.response.to.have.status(200);
           });`,
            `pm.test('Response is an empty string', function () {
                const jsonData = pm.response.json();
                pm.expect(jsonData).to.eql('');
            });`,
          ],
          type: 'text/javascript',
        },
      }],
      request: {
        method: 'DELETE',
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
