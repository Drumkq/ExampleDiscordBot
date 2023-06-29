import {Client, EmbedBuilder, Interaction} from "discord.js";
import {BaseError} from "../exceptions/baseError";
import {Handler, SlashCommand} from "../types";

const buildEmbed = (exception: BaseError): EmbedBuilder => {
    return new EmbedBuilder()
        .setColor(0xFF0000)
        .setTitle(exception.name)
        .setDescription(exception.message)
        .setTimestamp()
        .setFooter({text: 'Nichka bot'});
};

const InteractionCreateHandler: Handler = {
    execute: async (client: Client): Promise<void> => {
        client.on('interactionCreate', async (interaction: Interaction) => {
            if (interaction.isChatInputCommand()) {
                const command: SlashCommand = interaction.client.slashCommands.get(interaction.commandName);

                if (!command) return;

                try {
                    await command.execute(interaction);
                } catch (e) {
                    if (e instanceof BaseError) {
                        const embedException = buildEmbed(e);

                        await interaction.reply(
                            {
                                embeds: [embedException],
                                ephemeral: true
                            }
                        );
                    } else {
                        await interaction.reply(
                            {
                                content: `Something went wrong: ${e}`,
                                ephemeral: true
                            }
                        );
                    }
                }
            }
        });
    }
};

export default InteractionCreateHandler;