import Messages from './errorMessages';

class CustomError extends Error {
    public status: number;

    constructor(message: string) {
        super();

        this.name = this.constructor.name;
        this.message = message;
        this.status = 500;
    }
}

export class NotFoundError extends CustomError {
    constructor(message: string = Messages.NOT_FOUND) {
        super(message);
        this.status = 404;
    }
}

export class ForbiddenError extends CustomError {
    constructor(message: string = Messages.FORBIDDEN) {
        super(message);
        this.status = 403;
    }
}

export class BadRequestError extends CustomError {
    constructor(message: string = Messages.BAD_REQUEST) {
        super(message);
        this.status = 400;
    }
}


