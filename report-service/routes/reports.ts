import { Context } from 'koa';
import Router from 'koa-router';
import ReportModel from '../models/reports';

const router = new Router();

router
    .get('/:id', async (ctx: Context) => {
        ctx.body = await ReportModel.findById(ctx.params.id);
    })
    .post('/', async (ctx: Context) => {
        const report = new ReportModel({
            userId: '1',
            body: 'Test report',
            location: {
                lat: 0,
                lon: 0,
            },
        });

        await report.save();

        ctx.body = report;
    });

export default router;
