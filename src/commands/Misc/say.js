const { Interaction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {
        name: 'say',
        description: 'The bot will say what you want.',
        options: [
            {
                name: 'content',
                description: 'The message content',
                type: ApplicationCommandOptionType.String,
                require: true
            },
            {
                name: 'channel',
                description: 'Channel which this message will be sent.',
                type: ApplicationCommandOptionType.Channel,
                require: false
            }
        ]
    },
    /**
    * 
    * @param {Interaction} param0.interaction
    */
    run: async ({ interaction }) => {
        await interaction.reply({ content: 'Your message is being processed...', ephemeral: true });
        const content = interaction.options.getString('content');
        const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

        await targetChannel.send(content);
    }
}