const request = require('request-promise');

export class ReportClient {
    constructor(private url: string) {

    }

    public async getReportById(reportId: string) {
        return request({
            json: true,
            uri: `${this.url}/reports/${reportId}`
        });
    }
}
