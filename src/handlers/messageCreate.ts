import {ChannelType} from "discord-api-types/v9";
import {Client, Message} from "discord.js";
import {Handler} from "../types";
import config from "../config";

const MessageCreateHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        client.on('messageCreate', (message: Message) => {
            if (!message.member || message.member.user.bot) return;
            if (!message.guild) return;

            const prefix = config.PREFIX;

            if (!message.content.startsWith(prefix)) return;

            if (message.channel.type !== ChannelType.GuildText) return;

            const args = message.content.substring(prefix.length).split(' ');
            let command = message.client.textCommands.get(args[0]);

            if (!command) {
                const alias = message.client.textCommands.find(command => command.aliases.includes(args[0]));
                if (!alias) return;

                command = alias;
            }

            command.execute(message, args);
        });
    }
};

export default MessageCreateHandler;