module.exports = {
    data: {
        name: 'fav-stock',
    },

    async execute(interaction, client) {
        await interaction.reply({
            content: `You said your favorite stock is: ${interaction.fields.getTextInputValue(
                'favStockInput'
            )}`,
        });
    },
};
