const { HealthcheckController } = require('controllers/healthcheck');
const httpStatusCodes = require('http-status-codes');

describe('HealthcheckController', function () {

  let healthcheckController;

  beforeAll(function () {
    healthcheckController = new HealthcheckController();
  });

  test('should return OK', async () => {
    const healthcheck = await healthcheckController.get();
    expect(healthcheck).toBe("OK");
  });

  test('should exit with statuscode 200', async () => {
    const healthcheck = await healthcheckController.get();
    expect(healthcheckController.getStatus()).toBe(httpStatusCodes.OK);
  });
});