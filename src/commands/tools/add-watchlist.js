const { SlashCommandBuilder } = require('discord.js');
const UserWatchlist = require('../../models/userWatchlist');
const mongoose = require('mongoose');
const StockPriceFetcher = require('stock-price-fetcher');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('add-to-watchlist')
        .setDescription('Add a stock to your watchlist.')
        .addStringOption((option) =>
            option
                .setRequired(true)
                .setName('stock-symbol')
                .setDescription('Enter the stock symbol to add to your watchlist.')
        ),

    async execute(interaction, client) {
        const stockSymbol = interaction.options.getString('stock-symbol').toUpperCase();

        let userWatchlist = await UserWatchlist.findOne({ userId: interaction.user.id });
        let currentPrice;

        try {
            currentPrice = await StockPriceFetcher.getStockPrice(stockSymbol);
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: `Failed to add ${stockSymbol} to your watchlist. Please ensure the stock symbol is valid.`,
                ephemeral: true,
            });
            return;
        }

        if (!userWatchlist) {
            userWatchlist = await new UserWatchlist({
                _id: new mongoose.Types.ObjectId(),
                userName: interaction.user.username,
                userId: interaction.user.id,
                watchlistItems: [stockSymbol],
            }).save();
        } else {
            if (userWatchlist.watchlistItems.includes(stockSymbol)) {
                await interaction.reply({
                    content: `The stock ${stockSymbol} is already in your watchlist.`,
                    ephemeral: true,
                });
                return;
            }

            userWatchlist.watchlistItems.push(stockSymbol);
            await userWatchlist.save();
        }

        await interaction.reply({
            content: `The stock ${stockSymbol} has been successfully added to your watchlist. The current price is $${currentPrice.toFixed(2)}.`,
        });
    },
};