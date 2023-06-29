import {BaseError} from "./baseError";

class EntityDoesNotExist extends BaseError {
    public constructor(message?: string) {
        const msg = message || 'Entity does not exist';
        super('Entity does not exist', msg);
    }
}

export {
    EntityDoesNotExist
};