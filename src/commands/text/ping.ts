import {Command} from "../../typings/types";
import {Message} from "discord.js";

const PingCommand: Command = {
    name: 'ping',
    aliases: ['пинг'],
    execute: async (message: Message, args: Array<string>): Promise<void> => {
        await message.channel.send('pong!');
    }
};

export default PingCommand;