import Router from 'koa-router';

import { getReportById, modifyReport, deleteReport, createNewReport } from '../controllers/reports'

const router = new Router();

router
    .get('/:id', getReportById)
    .patch('/:id', modifyReport)
    .delete('/:id', deleteReport)
    .post('/', createNewReport);

export default router;
