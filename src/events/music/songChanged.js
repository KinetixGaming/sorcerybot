module.exports = {
    name: 'songChanged',
    once: false,
    async execute(client) {
        console.log(`Song is now playing.`);
    }
}