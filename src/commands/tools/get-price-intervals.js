const { SlashCommandBuilder, CommandOptionType } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('live-stock-price')
        .setDescription('Get the live stock price of any stock')
        .addStringOption(option =>
            option.setName('stock-name')
                .setDescription('Enter the stock name')
                .setRequired(true)
                .setMaxLength(20)
        )
        .addStringOption(option =>
            option.setName('interval')
                .setDescription('Select the interval time')
                .setRequired(true)
                .setAutocomplete(true)
                .addChoices([
                    ['1 Minute', '1min'],
                    ['5 Minutes', '5min'],
                    ['15 Minutes', '15min'],
                    ['30 Minutes', '30min'],
                    ['1 Hour', '60min'],
                    ['Daily', 'daily'],
                    ['Weekly', 'weekly'],
                    ['Monthly', 'monthly']
                ])
        )
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Specify the number of intervals')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(50)
        ),

    async execute(interaction, client) {
        const stockName = interaction.options.getString('stock-name');
        const intervalTime = interaction.options.getString('interval');
        const amount = interaction.options.getInteger('amount');

        const { stocks } = client;
        
        try {
            const results = await stocks.getTimeSeries({
                symbol: stockName,
                interval: intervalTime,
                amount: amount
            });

            let response = `Live stock price information for **${stockName}** over **${amount} ${intervalTime} intervals**:\n`;
            results.forEach(({ open, close, date }) => {
                response += `On ${date}, the stock opened at $${open.toFixed(2)} and closed at $${close.toFixed(2)}.\n`;
            });

            await interaction.reply({
                content: response
            });
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Failed to retrieve stock price information. Please check the provided stock name and try again.',
                ephemeral: true
            });
        }
    },
};