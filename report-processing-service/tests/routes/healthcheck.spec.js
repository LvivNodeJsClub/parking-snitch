const { app } = require('app');
const request = require('supertest');
const httpStatusCodes  = require('http-status-codes');

describe('Healthcheck', function () {
  const PORT = 3000;

  let server;

  beforeAll(async function (done) {
    server = await app.listen(PORT, () => {
      console.log(`Listening port ${PORT}`);
      done();
    });
  });

  afterAll(async function () {
    await server.close();
  });

  test('should be return 200 OK', async function () {
    const s = await request(server)
      .get('/healthcheck')
      .set('Accept', 'application/json')
      .expect(httpStatusCodes.OK);
  })
});
