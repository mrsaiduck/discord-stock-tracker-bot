require('dotenv').config();
const { token, databaseToken } = process.env;
const { connect } = require('mongoose');
const { Client, Collection } = require('discord.js');
const stocks = require('stocks.js');

const client = new Client({ intents: 32767 });
client.stocks = stocks;
client.commands = new Collection();
client.buttons = new Collection();
client.selectMenus = new Collection();
client.modals = new Collection();
client.commandArray = [];
client.stocks = new Stocks('SYTCQBUIU44BX2G4');

const fs = require('fs');
const { collection } = require('./schemas/user');

const functionFolder = fs.readdirSync('./src/functions');
for (const folder of functionFolder) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith('.js'));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleEvents();
client.handleCommands();
client.handleComponents();
client.login(token);
(async () => {
    await connect(databaseToken).catch(console.error);
})();
// (async () => {
//     await collection.createIndex({ userId: 1 });
// })(); // To create an Index