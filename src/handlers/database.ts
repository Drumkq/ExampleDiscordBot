import * as mongoose from "mongoose";
import {Client} from "discord.js";
import {Handler} from "../types";

const DatabaseHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        await mongoose.connect('mongodb://localhost:27017/nichka');
    }
};

export default DatabaseHandler;