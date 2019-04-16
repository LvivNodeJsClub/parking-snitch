const {default: SwaggerService} = require('services/swagger');
const httpStatusCodes = require('http-status-codes');

describe('SwaggerService', function () {

  let swaggerService;

  beforeAll(function () {
    swaggerService = new SwaggerService();
  });

  test('should contain documentation', () => {
    expect(swaggerService.documentation).toBeDefined();
  })
})
