const {default: app} = require('app');
const request = require('supertest');
const httpStatusCodes  = require('http-status-codes');

describe('Swagger', function () {

  let server;

  beforeAll(async function (done) {
    server = await app.listen(0, () => {
      done();
    });
  });

  afterAll(async function () {
    await server.close();
  });

  describe('/should.json', function () {

    test('should exit with statuscode 200', async function () {
      await request(server)
        .get('/swagger.json')
        .expect('Content-Type', /octet-stream/)
        .expect(httpStatusCodes.OK);
    })
  })

  describe('/documentation', function () {

    test('should exit with statuscode 200', async function () {
      await request(server)
        .get('/documentation')
        .expect('Content-Type', /html/)
        .expect(httpStatusCodes.OK);
    })
  })
});
