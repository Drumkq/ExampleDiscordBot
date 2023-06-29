import {Schema, model, SchemaTypes} from "mongoose";

interface IGiveaway extends Document {
    guildId: string,
    creatorId: string,
    giveawayName: string,
    winnersRequired: number,
    membersId?: string[],
    addMember(id: string): Promise<void>,
    addMembers(id: string[]): Promise<void>
}

const GiveawaySchema = new Schema({
        guildId: {
            type: SchemaTypes.String,
            required: true
        },
        creatorId: {
            type: SchemaTypes.String,
            required: true
        },
        giveawayName: {
            type: SchemaTypes.String,
            required: true
        },
        winnersRequired: {
            type: SchemaTypes.Number,
            required: true
        },
        membersId: {
            type: [SchemaTypes.String],
            required: false
        }
    },
    {
        methods: {
            async addMember(id: string): Promise<void> {
                this.membersId.push(id);
                this.save();
            },
            async addMembers(id: string[]): Promise<void> {
                this.membersId.concat(id);
                this.save();
            }
        }
    }
);

const GiveawayModel = model<IGiveaway>('Giveaway', GiveawaySchema, 'guildsGiveaway');

export {
    IGiveaway,
    GiveawayModel
}
