module.exports = {
    name: 'channelEmpty',
    once: false,
    async execute(player, client, interaction) {
        interaction.channel.send(`Everyone left the Voice Channel, queue ended.`);
    }
}