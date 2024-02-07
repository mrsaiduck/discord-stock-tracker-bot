const { ContextMenuCommandBuilder, ApplicationCommandType, MessageEmbed } = require('discord.js');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('View User Avatar')
        .setType(ApplicationCommandType.USER),

    async execute(interaction, client) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`${interaction.targetUser.username}'s Avatar`)
            .setImage(interaction.targetUser.displayAvatarURL({ dynamic: true, size: 4096 }));

        await interaction.reply({ embeds: [embed] });
    },
};