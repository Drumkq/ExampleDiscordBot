import {CommandInteraction, EmbedBuilder, GuildMember, SlashCommandBuilder} from "discord.js";
import {EntityDoesNotExist, InvalidGuild, InvalidUser} from "../../exceptions";
import {GiveawayModel} from "../../models/giveaway";
import {SlashCommand} from "../../typings/types";

const FinishGiveawayCommand: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName('finish-giveaway')
        .setDescription('Completes the giveaway')
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
        const creatorId = interaction.member.user.id;
        const giveawayName = interaction.options.get('name', true).value;
        const giveaway = await GiveawayModel.findOne({giveawayName, guildId, creatorId});
        if (!giveaway) {
            throw new EntityDoesNotExist(`You don't have a giveaway called "${giveawayName}"`);
        }

        if (!giveaway.membersId) {
            throw new EntityDoesNotExist(`Not enough participants to voice the results`);
        }

        if (giveaway.membersId?.length < giveaway.winnersRequired) {
            throw new EntityDoesNotExist(`Not enough participants to voice the results`);
        }

        const winners: GuildMember[] = [];
        const existsIndexes: number[] = [];
        function generateRandomIndex(max: number): number {
            const index = Math.floor(Math.random() * max);
            if (existsIndexes.includes(index)) {
                return generateRandomIndex(max);
            }

            existsIndexes.push(index);
            return index;
        }

        for (let i = 0; i < giveaway.winnersRequired; i++) {
            const randomizedIndex = generateRandomIndex(giveaway.membersId.length);
            winners.push(await interaction.guild.members.fetch(giveaway.membersId[randomizedIndex]));
        }

        const embed = new EmbedBuilder()
            .setColor(0x00FF00)
            .setTitle('Giveaway results')
            .setDescription(`The "${giveawayName}" handout was won by these players:`)
            .setTimestamp()
            .setFooter({text: 'Nichka bot'});

        for (let i = 0; i < winners.length; i++) {
            embed.addFields({name: `${i + 1} winner`, value: winners[i].user.username, inline: true});
        }

        await giveaway.deleteOne();

        await interaction.reply({
            embeds: [
                embed
            ]
        });
    }
};

export default FinishGiveawayCommand;