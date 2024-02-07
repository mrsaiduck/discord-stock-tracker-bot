const { SlashCommandBuilder } = require('discord.js');
const User = require('../../schemas/user');
const mongoose = require('mongoose');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register-user')
        .setDescription('Register a new user')
        .addStringOption((option) =>
            option
                .setName('name')
                .setDescription('Your name')
                .setRequired(true)
        )
        .addIntegerOption((option) =>
            option
                .setName('age')
                .setDescription('Your age')
                .setRequired(true)
        )
        .addStringOption((option) =>
            option
                .setName('favorite-stock')
                .setDescription('Your favorite stock')
        ),

    async execute(interaction, client) {
        const name = interaction.options.getString('name');
        const age = interaction.options.getInteger('age');
        const favoriteStock = interaction.options.getString('favorite-stock');
        let userProfile = await User.findOne({ userId: interaction.user.id });

        if (!userProfile) {
            userProfile = await new User({
                _id: new mongoose.Types.ObjectId(),
                userPreferedName: name,
                userName: interaction.user.username,
                userId: interaction.user.id,
                userIcon: interaction.user.avatarURL() || null,
                userAge: age,
                userFavStock: favoriteStock || null,
            });
            userProfile.save().catch(console.error);
            await interaction.reply({
                content: `You have been successfully registered in **${interaction.guild.name}**!`,
            });
        } else {
            await interaction.reply({
                content: `${userProfile.userPreferedName} is already registered in the database. If you want to update your profile, try the **/update-profile** command.`,
            });
        }
    },
};