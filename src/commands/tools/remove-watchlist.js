const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-from-watchlist')
        .setDescription('Remove an item from your watchlist!')
        .addStringOption((option) =>
            option
                .setName('stock-name')
                .setDescription(
                    'Which stock do you want to remove from your watchlist?'
                )
                .setRequired(true)
        ),

    async execute(interaction, client) {
        const userWatchlist = await watchlist.findOne({
            userId: interaction.user.id,
        });

        if (!userWatchlist) {
            await interaction.reply({
                content:
                    'You have not created a watchlist yet. Use the **/add-to-watchlist** command to add stocks to your watchlist.',
                ephemeral: true,
            });
            return;
        }

        const stockName = interaction.options.getString('stock-name');

        if (!userWatchlist.userWatchlistItems.includes(stockName)) {
            await interaction.reply({
                content: `The stock "${stockName}" is not in your watchlist. Use the **/view-watchlist** command to see your current watchlist.`,
                ephemeral: true,
            });
            return;
        }

        userWatchlist.userWatchlistItems =
            userWatchlist.userWatchlistItems.filter(
                (item) => item !== stockName
            );
        userWatchlist.save().catch(console.error);

        await interaction.reply({
            content: `The stock "${stockName}" has been removed from your watchlist. Use the **/view-watchlist** command to see your updated watchlist.`,
        });
    },
};