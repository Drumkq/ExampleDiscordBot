import {Message} from "discord.js";
import {Command} from "../../types";

const PingCommand: Command = {
    name: 'ping',
    aliases: ['пинг'],
    execute: async (message: Message, args: Array<string>): Promise<void> => {
        await message.channel.send('pong!');
    }
};

export default PingCommand;