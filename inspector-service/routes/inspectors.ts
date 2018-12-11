import {Router} from 'express';
import {
    getInspectorById,
    getAllInspectors,
    addNewInspector,
    updateInspector,
    replaceInspector,
    deleteInspector
} from '../controllers/inspectors';
import asyncMiddleware from "../utils/asyncMiddleware";

const router = Router();

router.route('/:id')
    .get(asyncMiddleware(getInspectorById))
    .put(asyncMiddleware(replaceInspector))
    .patch(asyncMiddleware(updateInspector))
    .delete(asyncMiddleware(deleteInspector));

router.route('/')
    .get(asyncMiddleware(getAllInspectors))
    .post(asyncMiddleware(addNewInspector));

export default router;
