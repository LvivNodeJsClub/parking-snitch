import request from 'request-promise';

export default class ReportClient {
    constructor(private url: string) {

    }

    public async getReportById(reportId: string) {
        return request({
            json: true,
            uri: `${this.url}/reports/${reportId}`,
        });
    }
}
