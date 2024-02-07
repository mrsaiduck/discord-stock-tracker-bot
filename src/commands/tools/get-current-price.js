const { SlashCommandBuilder } = require('discord.js');
const stockPrice = require('live-stock-price');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('current-stock-price')
        .setDescription('Get the current price of a stock')
        .addStringOption(option =>
            option.setName('stock-name')
                .setDescription('Enter the stock symbol')
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const stockName = interaction.options.getString('stock-name');
        
        try {
            const price = await stockPrice(stockName);
            await interaction.reply({
                content: `The current price of **${stockName}** is: $${price.toFixed(2)}`,
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Failed to retrieve the current price. Please check the provided stock symbol and try again.',
                ephemeral: true
            });
        }
    },
};