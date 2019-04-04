import request from 'supertest';
import 'mocha';
import { expect } from 'chai';
import { Server } from "http";
import HttpStatusCodes from 'http-status-codes';
import mongoose from 'mongoose';
import app from '../../src/app';
import { init } from '../../src/init';
import { Notification, NotificationModel } from '../../src/models/notification';
import { NotificationResponse } from "../../src/controllers/notification";

describe('Notification integration test', function () {
    const PORT = 3000;

    let server: Server;

    before(async function () {
        await init().then(async () => {
            server = await app.listen(PORT);
        });
    });

    afterEach(async function () {
        await Notification.deleteMany({});
    });

    after(async function () {
        await server.close();
        await mongoose.connection.close();
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

        expect(response.body[0].id).to.be.a('string');
    });

    it('should store notification in database', async function () {
        const url = '/notify';
        const inspectorId = '1234';
        const reportId = '321';
        const response = await request(server)
            .post(url)
            .send({
                inspectorId: inspectorId,
                reportId: reportId
            }).set('Accept', 'application/json')
            .expect(HttpStatusCodes.CREATED);

        const resultFromDB:NotificationModel|null = await Notification.findOne({
            _id: response.body[0].id
        });

        expect(resultFromDB).not.to.be.null;
        expect(resultFromDB).to.have.property('inspectorId').to.be.equal(inspectorId);
        expect(resultFromDB).to.have.property('reportId').to.be.equal(reportId);
    });

    it('should create notification for each notification type', async function () {
        const url = '/notify';
        const inspectorId = '1234';
        const reportId = '322';
        const types = ['SMS', 'EMAIL'];
        const response = await request(server)
            .post(url)
            .send({
                inspectorId: inspectorId,
                reportId: reportId,
                types
            }).set('Accept', 'application/json')
            .expect(HttpStatusCodes.CREATED);

        const notificationResponse = response.body as Array<NotificationResponse>;
        const resultsFromDB:Array<NotificationModel>|null = await Notification.find({
            _id: {
                $in: notificationResponse.map(({id}) => id)
            }
        }).exec();

        resultsFromDB.forEach((resultFromDB) => {
                expect(resultFromDB).not.to.be.null;
                expect(resultFromDB).to.have.property('inspectorId').to.be.equal(inspectorId);
                expect(resultFromDB).to.have.property('reportId').to.be.equal(reportId);
                expect(resultFromDB).to.have.property('type').to.be.oneOf(types);
        });

        expect(resultsFromDB.length).to.be.equal(types.length);
    })
});
