import {Handler} from "../typings/types";
import * as mongoose from "mongoose";
import {Client} from "discord.js";

const DatabaseHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        await mongoose.connect('mongodb://localhost:27017/nichka');
    }
};

export default DatabaseHandler;