import {Router} from 'express';
import inspectorsRouter from './inspectors';
import healthCheck from './healthcheck';

const router = Router();

router.use('/inspectors', inspectorsRouter);
router.use('/healthcheck', healthCheck);

export default router;