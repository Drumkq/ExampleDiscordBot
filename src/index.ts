import {Client, Collection} from "discord.js";
import {Handler} from "./types";
import config from "./config";
import * as path from "path";
import * as fs from "fs";

async function main() {
    const client = new Client({intents: ['Guilds', 'GuildMembers', 'GuildIntegrations', 'MessageContent', 'GuildMessages']});

    client.slashCommands = new Collection();
    client.textCommands = new Collection();

    const handlersPath = path.join(__dirname, '/handlers');
    fs.readdirSync(handlersPath).forEach((value) => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const handler: Handler = require(`${handlersPath}/${value}`).default;
        handler.execute(client);
    });

    await client.login(config.TOKEN);
}

main();