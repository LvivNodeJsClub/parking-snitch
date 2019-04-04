import request from 'supertest';
import HttpStatusCodes from "http-status-codes";
import app from "../../src/app";
import { Server } from "http";


describe('Healthcheck integration test', function () {
    const PORT = 3000;

    let server: Server;

    before(async function () {
        server = app.listen(PORT);
    });

    after(async function () {
        server.close();
    });

    it('should return 200 OK', async function() {
        const url = '/healthcheck';

        await request(server)
            .get(url)
            .set('Accept', 'application/json')
            .expect(HttpStatusCodes.OK);
    });
});
