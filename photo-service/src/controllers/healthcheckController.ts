import { Request, Response } from 'restify';

export default (request: Request, response: Response) => {
	response.send(200);
};
