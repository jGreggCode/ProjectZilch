const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {
        name: 'ping',
        description: 'Pong!',
    },

    run: async ({ interaction, client, handler }) => {
        const embedBuilder = new EmbedBuilder();
        const author = interaction.user.username;

        await interaction.deferReply();

        const reply = await interaction.fetchReply();
        const ping = reply.createdTimestamp - interaction.createdTimestamp;


        const newMsg = `**Client: \`${ping}ms\`** \n**Websocket: \`${client.ws.ping}ms\`**`;

        embedBuilder.setDescription(newMsg);
        embedBuilder.setColor('Green');
        embedBuilder.setFooter({ text: author });

        interaction.editReply({ embeds: [embedBuilder] });
    },
};