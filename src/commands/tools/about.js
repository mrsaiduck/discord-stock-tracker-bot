const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('favorite-stock')
        .setDescription('Set or update your favorite stock.'),

    async execute(interaction, client) {
        const validateStockInput = (input) => {
            return input.length > 0 && input.length <= 10;
        };

        const askFavoriteStock = async () => {
            await interaction.reply('What is your favorite stock?');

            try {
                const collected = await interaction.channel.awaitMessages({
                    filter: (msg) => msg.author.id === interaction.user.id,
                    max: 1,
                    time: 60000,
                    errors: ['time'],
                });

                const favoriteStock = collected.first().content.toUpperCase();
                if (validateStockInput(favoriteStock)) {
                    await interaction.reply(`Your favorite stock is now set to: ${favoriteStock}`);
                } else {
                    throw new Error('Invalid input. Please provide a valid stock symbol.');
                }
            } catch (error) {
                console.error(error);
                await interaction.reply('Sorry, I didn\'t get a valid response. Please try again later.');
            }
        };

        await askFavoriteStock();
    },
};