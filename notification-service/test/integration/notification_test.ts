import request from 'supertest';
import 'mocha';
import {expect} from 'chai';
import app from '../../src/app';
import {Server} from "http";
import HttpStatusCodes from 'http-status-codes';
import { MongoClient, Collection } from 'mongodb';

describe('Notification integration test', function () {
    const PORT = 3000;
    let mongoClient: MongoClient;
    let collection: Collection<any>;

    let server: Server;

    before(async function () {
        server = app.listen(PORT);
        mongoClient = await MongoClient.connect('mongodb://localhost:32772', { useNewUrlParser: true });
        collection = await mongoClient.db('notifications_test').collection('Notifications');
    });

    after(async function () {
        server.close();
        await mongoClient.close();
    });

    it('should receive response from endpoint', async function () {
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

    it('should store notification in database', async function () {
        const url = '/notify';
        const inspectorId = 1234;
        const reportId = 321;
        const response = await request(server)
            .post(url)
            .send({
                inspectorId: inspectorId,
                reportId: reportId
            }).set('Accept', 'application/json')
            .expect(HttpStatusCodes.CREATED);

        const resultFromDB = await collection.findOne({
            _id: response.body.id
        });

        expect(resultFromDB).not.to.be.null;
        expect(resultFromDB).to.haveOwnProperty('inspectorId').to.be.equal(inspectorId);
        expect(resultFromDB).to.haveOwnProperty('reportId').to.be.equal(reportId);
    });
});
