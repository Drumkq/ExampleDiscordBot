import {load} from "ts-dotenv";

const config = load({
    TOKEN: String,
    ID: String,
    PREFIX: String
});

export default config;