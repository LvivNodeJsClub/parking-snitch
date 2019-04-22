import healthCheckController from '../../src/controllers/healthcheckController';

describe('healthCheckController', () => {
	it('should return 200 OK', () => {
		const request: any = {};
		const response: any = {
			send: jest.fn(),
		};

		healthCheckController(request, response);

		expect(response.send).toBeCalledTimes(1);
		expect(response.send).toBeCalledWith(200);
	});
});
