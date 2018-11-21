import { NOT_FOUND, FORBIDDEN, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import Messages from './errorMessages';

class CustomError extends Error {
    private status: number;

    constructor(message: string, status: number) {
        super(message);

        this.name = this.constructor.name;
        this.message = message;
        this.status = status || INTERNAL_SERVER_ERROR;
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = Messages.NOT_FOUND) {
        super(message, NOT_FOUND);
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = Messages.FORBIDDEN) {
        super(message, FORBIDDEN);
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = Messages.BAD_REQUEST) {
        super(message, BAD_REQUEST);
    }
}


