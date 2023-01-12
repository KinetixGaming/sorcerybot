const { createAudioPlayer } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const { RepeatMode } = require('discord-music-player');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skip the current song'),
    async execute(interaction, client) {
        client.player.getQueue(interaction.guild.id).skip();
    }
}