import {BaseError} from "./baseError";

class InvalidUser extends BaseError {
    public constructor() {
        super('Invalid user', 'Failed to retrieve user information');
    }
}

export {
    InvalidUser
};