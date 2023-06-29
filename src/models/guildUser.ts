import {Schema, model, SchemaTypes} from "mongoose";

interface IUser extends Document {
    guildId: string,
    userId: string
}

const UserSchema = new Schema({
        guildId: {
            type: SchemaTypes.String,
            required: true
        },
        userId: {
            type: SchemaTypes.String,
            required: true
        }
    }
);

const UserModel = model<IUser>('User', UserSchema, 'guildUsers');

export {
    IUser,
    UserModel
}
