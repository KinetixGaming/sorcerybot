require('dotenv').config({path: './src/.env'});

const { Client, Collection, GatewayIntentBits, IntentsBitField } = require('discord.js');
const fs = require('fs');

const myIntents = new IntentsBitField();
myIntents.add(IntentsBitField.Flags.GuildPresences, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildVoiceStates);

const client = new Client({ intents: myIntents });

client.commands = new Collection();

client.commandArray = [];

const { Player } = require("discord-music-player");
const player = new Player(client, {
    leaveOnEmpty: true,
});

client.player = player;

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));
        for (const file of functionFiles) 
          require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);