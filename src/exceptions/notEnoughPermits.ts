import {BaseError} from "./baseError";

class NotEnoughPermits extends BaseError {
    public constructor() {
        super('Not enough permits', 'You do not have enough rights to use this command');
    }
}

export {
    NotEnoughPermits
};