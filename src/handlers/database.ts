import {Handler} from "../typings/types";
import * as mongoose from "mongoose";
import config from "../config";

const DatabaseHandler: Handler = {
    execute: async (/* client: Client */): Promise<void> => {
        await mongoose.connect(config.DB_CON_STR);
    }
};

export default DatabaseHandler;