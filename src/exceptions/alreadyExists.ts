import {BaseError} from "./baseError";

class AlreadyExists extends BaseError {
    public constructor(message?: string) {
        const msg = message || 'A document with this identifier already exists';

        super('Already exists', msg);
    }
}

export {
    AlreadyExists
};