import {BaseError} from "./baseError";
import {EmbedBuilder} from "discord.js";

class EmbedBuildHelper {
    static buildStandardEmbed(title: string, description?: string): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(title)
            .setDescription(description || null)
            .setTimestamp()
            .setFooter({text: 'Nichka bot'});
    }

    static buildEmbedException(exception: BaseError): EmbedBuilder {
        return this.buildStandardEmbed(exception.name, exception.message);
    }
}

export {EmbedBuildHelper};