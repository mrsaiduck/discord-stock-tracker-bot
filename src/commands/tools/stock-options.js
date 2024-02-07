const { SlashCommandBuilder, MessageActionRow, MessageSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stock-options')
        .setDescription('Returns a stock option menu!'),

    async execute(interaction, client) {
        const menu = new MessageSelectMenuBuilder()
            .setCustomId('stock-menu')
            .setMinValues(1)
            .setMaxValues(1)
            .setPlaceholder('Select an Option')
            .addOptions([
                {
                    label: 'Get live stock prices!',
                    description: 'View live stock prices on Yahoo Finance',
                    value: 'https://finance.yahoo.com/'
                },
                {
                    label: 'Make live trades!',
                    description: 'Trade stocks live on Webull',
                    value: 'https://www.webull.com'
                }
            ]);

        const row = new MessageActionRow()
            .addComponents(menu);

        await interaction.reply({
            content: 'Here are some stock options:',
            components: [row]
        });
    },
};