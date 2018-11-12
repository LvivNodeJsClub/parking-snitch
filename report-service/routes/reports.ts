import Router from 'koa-router';

import { getReportById, updateReport, deleteReport, createNewReport } from '../controllers/reports'

const router = new Router();

router
    .get('/:id', getReportById)
    .patch('/:id', updateReport)
    .delete('/:id', deleteReport)
    .post('/', createNewReport);

export default router;
