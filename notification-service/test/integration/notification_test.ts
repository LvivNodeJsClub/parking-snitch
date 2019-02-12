import request from 'supertest';
import 'mocha';
import {expect} from 'chai';
import app from '../../src/app';
import {Server} from "http";
import HttpStatusCodes from 'http-status-codes';

describe('Notification integration test', function () {
    const PORT = 3000;

    let server: Server;

    before(function () {
        server = app.listen(PORT);
    });

    after(function () {
        server.close();
    });

    it('should successfully save notification', async function () {
        const url = '/notify';
        const response = await request(server)
            .post(url)
            .send({
                inspectorId: 1244,
                reportId: 321
            }).set('Accept', 'application/json')
            .expect(HttpStatusCodes.CREATED);

        expect(response.body.id).to.be.a('string');
    });
});
