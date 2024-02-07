const { SlashCommandBuilder, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show-developers')
        .setDescription("Display buttons to developers' GitHub profiles."),

    async execute(interaction, client) {
        const saiGithubBtn = new MessageButton()
            .setCustomId('sai_github')
            .setLabel("Sai's GitHub")
            .setStyle('PRIMARY');

        const row = new MessageActionRow().addComponents(saiGithubBtn);

        await interaction.reply({
            content: "Here's the GitHub profile of our developer Sai:",
            components: [row],
        });
    },
};