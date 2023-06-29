import {Client, REST, SlashCommandBuilder} from "discord.js";
import {Handler, SlashCommand} from "../types";
import {Routes} from "discord-api-types/v9";
import config from "../config";
import * as path from "path";
import * as fs from "fs";

const SlashCommandHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        const slashCommands: SlashCommandBuilder[] = [];

        const slashCommandsPath = path.join(__dirname, '../commands/slash');
        fs.readdirSync(slashCommandsPath).filter(file => file.endsWith('.ts')).forEach(file => {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const command: SlashCommand = require(`${slashCommandsPath}/${file}`).default;
            slashCommands.push(command.command);
            client.slashCommands.set(command.command.name, command);
        });

        const rest = new REST({version: '10'}).setToken(config.TOKEN);

        try {
            await rest.put(Routes.applicationCommands(config.ID), {body: slashCommands.map(command => command.toJSON())});

            console.log('Successfully registered all slash commands');
        } catch (e) {
            console.error(e);
        }
    }
};

export default SlashCommandHandler;