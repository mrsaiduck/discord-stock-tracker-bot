const { SlashCommandBuilder } = require('discord.js');

const validIndicators = [
    'SMA', 'EMA', 'WMA', 'DEMA', 'TEMA', 'TRIMA', 'KAMA', 'MAMA', 'VWAP', 
    'T3', 'MACD', 'MACDEXT', 'STOCH', 'STOCHF', 'RSI', 'STOCHRSI', 'WILLR', 
    'ADX', 'ADXR', 'APO', 'PPO', 'MOM', 'BOP', 'CCI', 'CMO', 'ROC', 'ROCR', 
    'AROON', 'AROONOSC', 'MFI', 'TRIX', 'ULTOSC', 'DX', 'MINUS_DI', 'PLUS_DI', 
    'MINUS_DM', 'PLUS_DM', 'BBANDS', 'MIDPOINT', 'MIDPRICE', 'SAR', 'TRANGE', 
    'ATR', 'NATR', 'AD', 'ADOSC', 'OBV', 'HT_TRENDLINE', 'HT_SINE', 'HT_TRENDMODE', 
    'HT_DCPERIOD', 'HT_DCPHASE', 'HT_PHASOR'
];

module.exports = {
    data: new SlashCommandBuilder()
        .setName('get-indicator-price')
        .setDescription("Retrieves data for a specific technical indicator.")
        .addStringOption(option => 
            option.setName('stock-name')
                .setDescription('Enter the stock name.')
                .setRequired(true)
        )
        .addStringOption(option => 
            option.setName('interval')
                .setDescription('Enter the interval length.')
                .setRequired(true)
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
        .addStringOption(option => 
            option.setName('indicator')
                .setDescription('Enter the technical indicator.')
                .setRequired(true)
                .addChoices(validIndicators.map(indicator => [indicator, indicator]))
        )
        .addIntegerOption(option => 
            option.setName('amount')
                .setDescription('Enter the number of data points.')
                .setRequired(true)
                .setMinValue(1)
        )
        .addIntegerOption(option => 
            option.setName('time-period')
                .setDescription('Enter the time period for calculation.')
                .setRequired(true)
                .setMinValue(1)
        ),

    async execute(interaction, client) {
        const stockName = interaction.options.getString('stock-name');
        const interval = interaction.options.getString('interval');
        const indicator = interaction.options.getString('indicator');
        const amount = interaction.options.getInteger('amount');
        const timePeriod = interaction.options.getInteger('time-period');

        const { stocks } = client;

        if (!validIndicators.includes(indicator)) {
            await interaction.reply({
                content: `The indicator '${indicator}' is not valid. Use **/get-indicator-list** to see the list of valid indicators.`,
                ephemeral: true,
            });
            return;
        }

        try {
            const result = await stocks.getTechnicalIndicator({
                symbol: stockName,
                interval,
                amount,
                timePeriod,
                indicator
            });

            let responseMessage = `Data for ${indicator} indicator of ${stockName}:\n`;
            result.forEach(dataPoint => {
                responseMessage += `${dataPoint.date}: ${indicator} - ${dataPoint[indicator].toFixed(3)}\n`;
            });

            await interaction.reply({
                content: responseMessage
            });
        } catch (error) {
            await interaction.reply({
                content: 'Invalid stock name!',
                ephemeral: true,
            });
            console.error(error);
        }
    },
};