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
        .setName('list-indicators')
        .setDescription('Displays all available technical indicators.'),

    async execute(interaction, client) {
        const formattedIndicators = validIndicators.map(indicator => `\`${indicator}\``).join(', ');
        await interaction.reply({
            content: `Available technical indicators: ${formattedIndicators}`,
        });
    },
};