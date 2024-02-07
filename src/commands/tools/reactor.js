const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reactor')
        .setDescription('Initiates a reaction collection'),

    async execute(interaction, client) {
        const message = await interaction.reply({
            content: 'React Here!',
            fetchReply: true,
        });

        const emojiId = '1168322296210002025'; // ID of the emoji you want to react with
        const emoji = client.emojis.cache.get(emojiId);

        if (!emoji) {
            console.error('Emoji not found.');
            return;
        }

        await message.react(emoji);

        const filter = (reaction, user) => {
            return reaction.emoji.id === emojiId && user.id === interaction.user.id;
        };

        const collector = message.createReactionCollector({
            filter,
            time: 5000,
        });

        const reactedUsers = new Set();

        collector.on('collect', (reaction, user) => {
            console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
            reactedUsers.add(user.id);
        });

        collector.on('end', (collected) => {
            console.log(`Collected ${collected.size} items`);
            const channel = client.channels.cache.get('channel-id'); // Replace 'channel-id' with the actual channel ID
            if (!channel) {
                console.error('Channel not found.');
                return;
            }
            channel.send('Reacted Users:');
            reactedUsers.forEach(userId => {
                channel.send(`<@${userId}>`);
            });
        });
    },
};