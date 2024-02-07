const { SlashCommandBuilder } = require('discord.js');
const watchlist = require('../../schemas/watchlist');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('view-watchlist')
        .setDescription('View your watchlist'),

    async execute(interaction, client) {
        const userWatchlist = await watchlist.findOne({
            userId: interaction.user.id,
        });

        if (!userWatchlist || !userWatchlist.userWatchlistItems.length) {
            await interaction.reply({
                content:
                    "Your watchlist is empty or you haven't created one yet. Use the **/add-watchlist** command to add stocks to your watchlist.",
                ephemeral: true,
            });
            return;
        }

        await interaction.reply({
            content: `Here is your watchlist, ${
                userWatchlist.userName || 'User'
            }:\n${userWatchlist.userWatchlistItems.join('\n')}`,
        });
    },
};