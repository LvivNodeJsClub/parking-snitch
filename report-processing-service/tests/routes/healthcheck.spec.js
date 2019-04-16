const {default: app} = require('app');
const request = require('supertest');
const httpStatusCodes  = require('http-status-codes');

describe('Healthcheck', function () {

  let server;

  beforeAll(async function (done) {
    server = await app.listen(0, () => {
      done();
    });
  });

  afterAll(async function () {
    await server.close();
  });

  test('should exit with statuscode 200', async function () {
    await request(server)
      .get('/healthcheck')
      .expect('Content-Type', /text/)
      .expect(httpStatusCodes.OK);
  })
});
