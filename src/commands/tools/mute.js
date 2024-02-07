const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute-user')
        .setDescription('Mutes a user for a specified duration')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('Mention the user to mute')
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option
                .setName('duration')
                .setDescription('Duration in minutes to mute the user')
                .setRequired(true)
                .setMin(1)
        ),

    async execute(interaction, client) {
        const targetUser = interaction.options.getUser('user');
        const muteDuration = interaction.options.getInteger('duration');

        const mutedRole = interaction.guild.roles.cache.find(role => role.name === 'muted');

        if (!mutedRole) {
            return await interaction.reply({
                content: "Muted role doesn't exist. Please set up a 'muted' role in your server settings.",
            });
        }

        try {
            const member = await interaction.guild.members.fetch(targetUser.id);
            if (member.roles.cache.has(mutedRole.id)) {
                return await interaction.reply({
                    content: 'User is already muted.',
                });
            }

            await member.roles.add(mutedRole);
            await interaction.reply({
                content: `Successfully muted ${targetUser} for ${muteDuration} minute(s).`,
            });

            // Set a timeout to unmute the user after the specified duration
            setTimeout(async () => {
                await member.roles.remove(mutedRole);
                await targetUser.send(`You have been unmuted in ${interaction.guild.name}`);
            }, muteDuration * 60000); // Convert minutes to milliseconds
        } catch (error) {
            console.error(error);
            await interaction.reply({
                content: 'Failed to mute the user. Please try again later.',
            });
        }
    },
};