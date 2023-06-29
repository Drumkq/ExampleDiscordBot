import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {AlreadyExists, InvalidGuild, InvalidUser} from "../../exceptions";
import {PermissionFlagsBits} from 'discord-api-types/v9';
import {GiveawayModel} from "../../models/giveaway";
import {SlashCommand} from "../../typings/types";

const GiveawayCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Creates a new draw on the server')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Giveaway name')
                .setRequired(true)
        )
        .addNumberOption(option =>
            option
                .setName('winners')
                .setDescription('Total number of winners')
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
        const winnersRequired = interaction.options.get('winners', true).value as number;
        if (await GiveawayModel.findOne({'$and': [{giveawayName}, {guildId}]})) {
            throw new AlreadyExists('A giveaway with that name already exists');
        }

        await GiveawayModel.create({
            guildId,
            creatorId,
            giveawayName: giveawayName,
            winnersRequired
        });

        await interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('Successfully')
                        .setDescription('You have successfully created a giveaway')
                        .setTimestamp()
                        .setFooter({text: 'Nichka bot'})
                ],
                ephemeral: true
            }
        );
    }
};

export default GiveawayCommand;