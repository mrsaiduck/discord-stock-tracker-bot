const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Check the bot\'s responsiveness'),

    async execute(interaction, client) {
        const startTime = Date.now();
        const reply = await interaction.reply('Pinging...');

        const endTime = Date.now();
        const latency = endTime - startTime;

        await reply.edit(`Pong! Latency is ${latency}ms.`);
    },
};