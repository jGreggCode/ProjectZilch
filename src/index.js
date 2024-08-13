require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { default: mongoose } = require('mongoose');
const keep_alive = require('../keep_alive.js');
const { CommandKit } = require('commandkit');
const path = require('path');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

new CommandKit({
    client,
    devUserIds: ['965553407366676521'],
    devGuildIds: ['493042300075638784'],
    commandsPath: path.join(__dirname, 'commands'),
    eventsPath: path.join(__dirname, 'events'),
    validationsPath: path.join(__dirname, 'validations'),
    bulkRegister: true,

});

(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error);
    }
})();

client.login(process.env.TOKEN);