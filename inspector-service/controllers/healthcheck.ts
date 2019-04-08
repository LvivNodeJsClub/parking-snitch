import httpStatusCodes from 'http-status-codes';
import {Request, Response} from 'express';

export const healthcheck = async (request: Request, response: Response) => {
    response.sendStatus(httpStatusCodes.OK);
};