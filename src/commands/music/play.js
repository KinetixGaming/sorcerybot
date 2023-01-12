const { createAudioPlayer } = require('@discordjs/voice');
const { SlashCommandBuilder } = require('discord.js');
const { RepeatMode, Utils } = require('discord-music-player');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Play some muusic!')
        .addStringOption(option =>
			option
				.setName('search')
				.setDescription('Search Query')
				.setRequired(true)),
    async execute(interaction, client) {

        await client.player.createQueue(interaction.guild.id, {
            data: {
                queueInitMessage: interaction
            }
        });

        let guildQueue = client.player.getQueue(interaction.guild.id);

        let search = await Utils.search(
            interaction.options.getString('search'),
            {
                sortBy: "view count",
            },
            guildQueue, 
            3
        );
        await queue.join(interaction.member.voice.channel).catch(err => {
            interaction.channel.send(`You must be connected to a voice channel first.`);
        });
        let song = await guildQueue.play(search[0]).catch(err => {
            console.log(err);
            if(!guildQueue)
                queue.stop();
        })
    }
}