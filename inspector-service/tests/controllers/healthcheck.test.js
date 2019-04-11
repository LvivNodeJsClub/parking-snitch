const {healthcheck}   = require('controllers/healthcheck');
const httpStatusCodes = require('http-status-codes');

describe('Healthcheck', () => {
    let sendStatusSpy;
    let req;
    let res;

    beforeAll(() => {
        sendStatusSpy = jest.fn();
        req           = {};
        res           = {sendStatus: sendStatusSpy};
    });

    test('Healthcheck should return 200 OK', async () => {
        await healthcheck(req, res);

        expect(sendStatusSpy).toHaveBeenCalled();
        expect(sendStatusSpy).toHaveBeenCalledWith(httpStatusCodes.OK);
    });
});