import {load} from "ts-dotenv";

const config = load({
    TOKEN: String,
    ID: String,
    PREFIX: String,
    DB_CON_STR: String
});

export default config;