import {BaseError} from "./baseError";

class InvalidGuild extends BaseError {
    public constructor() {
        super('Invalid guild', 'Failed to get guild ID. This command is not supported in DM');
    }
}

export {
    InvalidGuild
};