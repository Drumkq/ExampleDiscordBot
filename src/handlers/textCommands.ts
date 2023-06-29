import {Command, Handler} from "../typings/types";
import {Client} from "discord.js";
import * as path from "path";
import * as fs from "fs";

const TextCommandHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        const commandsPath = path.join(__dirname, '../commands/text');
        fs.readdirSync(commandsPath).forEach(file => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command: Command = require(`${commandsPath}/${file}`).default;
            client.textCommands.set(command.name, command);
        });
    }
};

export default TextCommandHandler;