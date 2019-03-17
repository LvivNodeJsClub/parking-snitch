const { healthcheck } = require('controllers/healthcheck');
const httpStatusCodes = require('http-status-codes');

test('Healthcheck should be return 200 OK', async () => {
  const ctx = {};
  await healthcheck(ctx);
  expect(ctx.status).toBe(httpStatusCodes.OK);
});
