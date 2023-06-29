import {EmbedBuildHelper} from "../exceptions/embedBuildHelper";
import {Handler, SlashCommand} from "../typings/types";
import {Client, Interaction} from "discord.js";
import {BaseError} from "../exceptions";

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
                        await interaction.reply(
                            {
                                embeds: [EmbedBuildHelper.buildEmbedException(e)],
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