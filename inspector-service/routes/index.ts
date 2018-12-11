import {Router} from 'express';
import inspectorsRouter from './inspectors';

const router = Router();

router.use('/inspectors', inspectorsRouter);

export default router;