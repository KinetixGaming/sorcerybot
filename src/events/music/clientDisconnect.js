module.exports = {
    name: 'clientDisconnect',
    once: false,
    async execute(client, interaction) {
        console.log(`I was kicked from the Voice Channel, queue ended.`);
    }
}