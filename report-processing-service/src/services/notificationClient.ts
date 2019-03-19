const request = require('request-promise');

export class NotificationClient {
    constructor(private url: string) {

    }

    public async notify(reportId: string, inspectorId: string) {
        return request({
            json: true,
            method: 'POST',
            uri: `${this.url}/notify`,
            body: {
                reportId,
                inspectorId,
                types: ["SMS", "EMAIL"]
            }
        });
    }
}
