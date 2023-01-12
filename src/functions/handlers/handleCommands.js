const { REST } = require(`@discordjs/rest`);
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, GatewayIntentBits } = require('discord.js');

const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config({path: '../../.env'});

module.exports = (client) => {
    client.handleCommands = async() => {

        const commandFolders = fs.readdirSync('./src/commands/');

        const commandsPath = path.join(__dirname, 'commands');

        for (const folder of commandFolders) {
            const commandFiles = fs
                .readdirSync(`./src/commands/${folder}`)
                .filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`);

                const filePath = path.join(commandsPath, file);
                
                if ('data' in command && 'execute' in command) {
                    client.commands.set(command.data.name, command);
                    client.commandArray.push(command.data.toJSON());
                    console.log(`Command: ${command.data.name} has been created`);
                } else {
                    console.log(`[WARNING] A command at ${filePath} is missing a required "data" or "execute" property.`)
                }
            }
        }

        const clientId = '1046860204400201811';
        const rest = new REST({ version: '9'}).setToken(process.env.TOKEN);
        try {
            console.log('Started refreshing application (/) commands.');
        
            await rest.put(Routes.applicationGuildCommands(clientId, "666058424731041801"), {
                body: client.commandArray,
            });
        
            console.log('Successfully reloaded application (/) commands.');
          } catch (error) {
            console.error(error);
          }
    };
};