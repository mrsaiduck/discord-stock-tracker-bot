const { SlashCommandBuilder } = require('discord.js');
const UserWatchlist = require('../../models/UserWatchlist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear-my-watchlist')
        .setDescription('Clears your current watchlist.'),

    async execute(interaction, client) {
        const userWatchlist = await UserWatchlist.findOne({ userId: interaction.user.id });

        if (!userWatchlist) {
            await interaction.reply({
                content:
                    'You don\'t have a watchlist yet. Use the **/add-to-watchlist** command to create one!',
                ephemeral: true,
            });
            return;
        }

        if (!userWatchlist.watchlistItems || userWatchlist.watchlistItems.length === 0) {
            await interaction.reply({
                content:
                    'Your watchlist is already empty. Use the **/add-to-watchlist** command to add stocks!',
                ephemeral: true,
            });
            return;
        }

        userWatchlist.watchlistItems = [];
        await userWatchlist.save();

        await interaction.reply({
            content: 'Your watchlist has been cleared successfully.',
        });
    },
};