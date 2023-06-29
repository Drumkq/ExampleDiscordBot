import {BaseError} from "./baseError";
import {EmbedBuilder} from "discord.js";

class EmbedBuildHelper {
    static buildEmbedException(exception: BaseError): EmbedBuilder {
        return new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle(exception.name)
            .setDescription(exception.message)
            .setTimestamp()
            .setFooter({text: 'Nichka bot'});
    }
}

export {EmbedBuildHelper};