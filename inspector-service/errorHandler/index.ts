import {NextFunction, Request, Response} from 'express';
import statusCodes from 'http-status-codes';
import {CustomError} from './customErrors';

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err.stack);
    next(err);
}

export function handleError(err: CustomError, req: Request, res: Response, next: NextFunction) {
    res.sendStatus(err.status || statusCodes.INTERNAL_SERVER_ERROR);
}