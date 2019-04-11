import request from 'request-promise';

export default class NotificationClient {
    constructor(private url: string) {

    }

    public async notify(reportId: string, inspectorId: string) {
        return request({
            body: {
                inspectorId,
                reportId,
                types: ['SMS', 'EMAIL'],
            },
            json: true,
            method: 'POST',
            uri: `${this.url}/notify`,
        });
    }
}
