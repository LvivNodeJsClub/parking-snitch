const { SwaggerController } = require('controllers/swagger');
const httpStatusCodes = require('http-status-codes');

describe('SwaggerController', function () {

  let swaggerController;

  beforeAll(function () {
    swaggerController = new SwaggerController();
  });
  
  test('should exit with statuscode 200', async () => {
    const swagger = await swaggerController.get();
    expect(swaggerController.getStatus()).toBe(httpStatusCodes.OK);
  });

  test('should return documentation', async () => {
    const swagger = await swaggerController.get();
    expect(swagger).toBeDefined();
  });
});