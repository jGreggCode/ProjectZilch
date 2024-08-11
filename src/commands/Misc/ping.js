const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'ping',
        description: 'Pong!',
    },

    run: async ({ interaction, client, handler }) => {
        let msg = await interaction.channel.send('Pinging please wait...')
        const embedBuilder = new EmbedBuilder();
        const author = interaction.user.username;
        const authorAvatar = interaction.user.displayAvatarURL({ format: 'png' });

        let latency = msg.createdTimestamp - interaction.createdTimestamp;
        msg.delete();

        const newMsg = `**Bot Latency:** \`${latency}ms\` \n**API Latency:** \`${Math.round(interaction.client.ws.ping)}ms\``
        embedBuilder.setDescription(newMsg);
        embedBuilder.setColor(interaction.member.displayHexColor);
        embedBuilder.setFooter({ text: `Requested By: ${author}`, iconURL: authorAvatar });
        embedBuilder.setTimestamp();

        interaction.reply({ embeds: [embedBuilder] });
    },
};