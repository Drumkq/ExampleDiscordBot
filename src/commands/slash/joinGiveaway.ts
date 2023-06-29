import {CommandInteraction, EmbedBuilder, SlashCommandBuilder} from "discord.js";
import {EntityDoesNotExist} from "../../exceptions/entityDoesNotExist";
import {AlreadyExists} from "../../exceptions/alreadyExists";
import {InvalidGuild} from "../../exceptions/invalidGuild";
import {InvalidUser} from "../../exceptions/invalidUser";
import {GiveawayModel} from "../../models/giveaway";
import {SlashCommand} from "../../types";

const JoinGiveawayCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('join-giveaway')
        .setDescription('joins the giveaway')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Giveaway name')
                .setRequired(true)
        ),
    execute: async (interaction: CommandInteraction): Promise<void> => {
        if (!interaction.guild) {
            throw new InvalidGuild();
        }

        if (!interaction.member) {
            throw new InvalidUser();
        }

        const guildId = interaction.guild.id;
        const memberId = interaction.member.user.id;
        const giveawayName = interaction.options.get('name', true).value;
        const giveaway = await GiveawayModel.findOne({guildId, giveawayName});
        if (!giveaway) {
            throw new EntityDoesNotExist('A giveaway with this name does not exist on this server');
        }

        if (giveaway.creatorId === memberId) {
            throw new AlreadyExists('You can\'t participate in your own giveaway');
        }

        if (giveaway.membersId?.includes(memberId)) {
            throw new AlreadyExists('You can\'t participate in a giveaway where you are already a member');
        }

        giveaway.addMember(memberId);
        await interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x00FF00)
                        .setTitle('Successfully')
                        .setDescription('You have successfully joined a giveaway')
                        .setTimestamp()
                        .setFooter({text: 'Nichka bot'})
                ],
                ephemeral: true
            }
        );
    }
};

export default JoinGiveawayCommand;