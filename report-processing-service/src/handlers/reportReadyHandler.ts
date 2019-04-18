import logger from "../logger";
import InspectorClient from '../services/inspectorClient';
import NotificationClient from '../services/notificationClient';
import ReportClient from '../services/reportClient';

export default class ReportReadyHandler {
    constructor(private reportClient: ReportClient,
                private inspectorClient: InspectorClient,
                private notificationClient: NotificationClient) {
    }

    public handler = async (reportId: string) => {
        logger.info(`reportId: ${reportId}`);

        const reportInfo = await this.reportClient.getReportById(reportId);
        logger.info(`reportInfo: ${JSON.stringify(reportInfo)}`);
        const inspectorInfo = await this.inspectorClient.getNearest(reportInfo.location);
        logger.info(`inspectorInfo: ${JSON.stringify(inspectorInfo)}`);
        const notificationInfo = await this.notificationClient.notify(reportInfo._id, inspectorInfo._id);
        logger.info(`notificationInfo: ${JSON.stringify(notificationInfo)}`);
    }
}
