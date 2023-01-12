const { ActionRowBuilder, PermissionFlagsBits, ButtonBuilder, ButtonStyle, Events, SlashCommandBuilder, EmbedBuilder, DiscordjsErrorCodes, discordSort } = require('discord.js');


module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout the specified user')
        .addUserOption(option =>
			option
				.setName('target')
				.setDescription('The member to timeout')
				.setRequired(true))
		.addStringOption(option =>
			option
				.setName('reason')
				.setDescription('The reason for timeout'))
		.setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
		.setDMPermission(false),
    async execute(interaction, client) {
        const target = interaction.options.getUser('target');
		const reason = interaction.options.getString('reason') ?? 'No reason provided';
        await interaction.reply(`Timing out ${target.username} for reason: ${reason}`);
		await target.timeout(5 * 60 * 1000, reason);
    }
}