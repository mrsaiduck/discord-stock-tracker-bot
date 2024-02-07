const { SlashCommandBuilder, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bot-info')
        .setDescription('Get information about the bot.'),

    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setTitle(`Stock Tracker Bot`)
            .setDescription(
                'This bot provides various real-time stock commands. It was created as one of the initial projects to practice JavaScript, specifically Discord.js.'
            )
            .setColor('#18e1ee')
            .setThumbnail(client.user.displayAvatarURL())
            .setTimestamp()
            .setFooter(client.user.tag, client.user.displayAvatarURL())
            .addField("Bot's Source Code", '[GitHub Repository](https://github.com/YourGitHubUsername/YourRepositoryName)')
            .addField("Developer's GitHub",
                'Sai: [mrsaiduck](https://github.com/mrsaiduck)'
            );

        await interaction.reply({
            embeds: [embed],
        });
    },
};