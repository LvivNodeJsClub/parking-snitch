/// <reference lib="dom" />
import request from 'supertest'; // has some issues with see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/12044
import {app} from './server';
import httpStatusCodes from 'http-status-codes';
import {Server} from "http";

describe('App', () => {
    const PORT = 3000;
    let server: Server;

    beforeAll(async function (done) {
        server = await app.listen(PORT, () => {
            console.log(`Listening port ${PORT}`);
            done();
        });
    });

    afterAll(async function () {
        await server.close();
    });

    describe('/healthcheck', () => {
        it('should return 200 Ok',async () => {
            await request(server)
                .get('/healthcheck')
                .set('Accept', 'application/json')
                .expect(httpStatusCodes.OK);

        })
    })
});
