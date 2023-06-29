import {
    Client,
    Collection,
    CommandInteraction, InteractionReplyOptions, Message,
    SlashCommandBuilder
} from "discord.js";
import {SlashCommand} from "./slashCommand";

export {};

declare module 'discord.js' {
    export interface Client {
        slashCommands: Collection<string, SlashCommand>;
        textCommands: Collection<string, Command>
    }

    export interface BaseMessageOptions {
        components: InteractionReplyOptions[];
    }
}

export type SlashCommand = {
    command: SlashCommandBuilder | any;
    execute: (interaction: CommandInteraction) => void;
}

export type Command = {
    name: string;
    aliases: Array<string>;
    execute: (message: Message, args: Array<string>) => void;
}

export type Handler = {
    execute: (client: Client) => void;
}
