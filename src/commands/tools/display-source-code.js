const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-source')
        .setDescription('Get the link to the bot\'s source code on GitHub.'),

    async execute(interaction, client) {
        const sourceCodeLink = 'https://github.com/YourGitHubUsername/YourRepositoryName';
        
        await interaction.reply({
            content: `Here's the link to the source code of the bot: ${sourceCodeLink}`,
        });
    },
};