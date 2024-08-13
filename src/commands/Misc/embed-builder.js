const { EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    data: {
        name: 'embed-builder',
        description: 'Sends an embed!',
        options: [
            {
                name: 'title',
                description: 'Title of the embed. Type none for no title',
                type: ApplicationCommandOptionType.String,
                require: true
            },
            {
                name: 'description',
                description: 'Description of the embed.',
                type: ApplicationCommandOptionType.String,
                require: true
            },
            {
                name: 'timestamp',
                description: 'Title of the embed.',
                type: ApplicationCommandOptionType.Boolean,
                require: true,
                choices: [
                    {
                        name: 'true',
                        value: true
                    },
                    {
                        name: "false",
                        value: false
                    }
                ]
            },
            {
                name: 'author',
                description: 'Provide you as an author or not.',
                type: ApplicationCommandOptionType.Boolean,
                require: true,
                choices: [
                    {
                        name: 'true',
                        value: true
                    },
                    {
                        name: 'false',
                        value: false
                    }
                ]
            },
            {
                name: 'channel',
                description: 'Channel which your embed will be sent',
                type: ApplicationCommandOptionType.Channel,
                require: false
            }
        ]
    },

    run: async ({ interaction, client, handler }) => {
        await interaction.reply({ content: 'Your embed is being processed...', ephemeral: true });

        const embedBuilder = new EmbedBuilder();
        // Get options from the interaction
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        const addTimestamp = interaction.options.getBoolean('timestamp');
        const addAuthor = interaction.options.getBoolean('author');
        const targetChannel = interaction.options.getChannel('channel') || interaction.channel;

        // Get the user information
        const author = interaction.user.username;
        const authorAvatar = interaction.user.displayAvatarURL({ format: 'png' });

        // Set the embed description and color
        embedBuilder.setDescription(description);
        embedBuilder.setColor(interaction.member.displayHexColor);

        // Conditionally add the title, timestamp, and author
        if (title && title.toLowerCase() !== 'none') {
            embedBuilder.setTitle(title);
        }

        if (addTimestamp) {
            embedBuilder.setTimestamp();
        }

        if (addAuthor) {
            embedBuilder.setAuthor({ name: author, iconURL: authorAvatar });
        }

        // Send the embed to the specified channel
        await targetChannel.send({ embeds: [embedBuilder] });

        // Edit the initial reply to inform the user that the embed was sent
        await interaction.editReply({ content: `Embed sent to ${targetChannel}!` });
    },
}; 