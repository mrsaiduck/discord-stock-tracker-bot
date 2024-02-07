const { SlashCommandBuilder } = require('discord.js');
const mongoose = require('mongoose');
const User = require('../../schemas/user');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update-profile')
        .setDescription('Update your profile information!')
        .addStringOption((option) =>
            option
                .setName('new-name')
                .setDescription('Change your username')
                .setRequired(false)
        )
        .addStringOption((option) =>
            option
                .setName('new-fav-stock')
                .setDescription('Change your favorite stock')
                .setRequired(false)
        ),

    async execute(interaction, client) {
        const userProfile = await User.findOne({ userId: interaction.user.id });

        if (!userProfile) {
            await interaction.reply({
                content:
                    'You have not registered yet. Use the **/register** command to register.',
            });
            return;
        }

        const newName = interaction.options.getString('new-name') || userProfile.userPreferedName;
        const newFavStock = interaction.options.getString('new-fav-stock') || userProfile.userFavStock;

        await User.updateOne(
            { userId: interaction.user.id },
            { $set: { userPreferedName: newName, userFavStock: newFavStock } }
        );

        await interaction.reply({
            content: 'Your profile has been updated successfully!',
        });
    },
};