import request from 'supertest';
import 'mocha';
import {expect} from 'chai';
import app from '../../src/app';
import {Server} from "http";

describe('Notification integration test', function () {
    let server: Server;

    before(function () {
        server = app.listen(3000);
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
            .expect(201);

        expect(response.body.id).to.be.a('string');
    });
});
