import {ChannelType} from "discord-api-types/v9";
import {Client, Message} from "discord.js";
import {Handler} from "../typings/types";
import config from "../config";
import {EmbedBuildHelper} from "../exceptions/embedBuildHelper";
import {BaseError} from "../exceptions";

const MessageCreateHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        client.on('messageCreate', async (message: Message) => {
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

            try {
                await command.execute(message, args);
            } catch (e) {
                if (e instanceof BaseError) {
                    message.channel.send(
                        {
                            embeds: [EmbedBuildHelper.buildEmbedException(e)],
                            reply: {messageReference: message}
                        }
                    );
                } else {
                    message.channel.send(
                        {
                            content: `Something went wrong: ${e}`,
                            reply: {messageReference: message}
                        }
                    );
                }
            }
        });
    }
};

export default MessageCreateHandler;