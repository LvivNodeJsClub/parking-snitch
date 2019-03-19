import {ReportClient} from "../services/reportClient";

export default class ReportReadyHandler {
    constructor(private reportClient: ReportClient) {

    }

    public handler = async (reportId: string) => {
        console.log(`reportId: ${reportId}`);

        const reportInfo = await this.reportClient.getReportById(reportId);
    };
}
