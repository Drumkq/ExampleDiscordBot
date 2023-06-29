import {EntityDoesNotExist, InvalidGuild, InvalidUser} from "../../exceptions";
import {EmbedBuildHelper} from "../../exceptions/embedBuildHelper";
import {CommandInteraction, SlashCommandBuilder} from "discord.js";
import {PermissionFlagsBits} from 'discord-api-types/v9';
import {GiveawayModel} from "../../models/giveaway";
import {SlashCommand} from "../../typings/types";

const DeleteGiveawayCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('delete-giveaway')
        .setDescription('Deletes a giveaway')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Giveaway name')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageEvents | PermissionFlagsBits.ManageWebhooks),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        if (!interaction.guild) {
            throw new InvalidGuild();
        }

        if (!interaction.member) {
            throw new InvalidUser();
        }

        const guildId = interaction.guild.id;
        const creatorId = interaction.member.user.id;
        const giveawayName = interaction.options.get('name', true).value;
        const giveaway = await GiveawayModel.findOne({guildId, giveawayName});
        if (!giveaway) {
            throw new EntityDoesNotExist('A giveaway with this name does not exist on this server');
        }

        if (giveaway.creatorId !== creatorId) {
            throw new EntityDoesNotExist('The user does not have this giveaway');
        }

        await giveaway.deleteOne();
        await interaction.reply({
            embeds: [EmbedBuildHelper.buildStandardEmbed('Giveaway deleted')],
            ephemeral: true
        });
    }
};

export default DeleteGiveawayCommand;