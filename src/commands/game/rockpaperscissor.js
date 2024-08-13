const { ApplicationCommandOptionType, ChatInputCommandInteraction, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

const choices = [
    { name: 'Rock', emoji: '✊', beats: 'Scissors' },
    { name: 'Paper', emoji: '✋', beats: 'Rock' },
    { name: 'Scissors', emoji: '✌️', beats: 'Paper' },
]

module.exports = {
    data: {
        name: 'rockpaperscissor',
        description: 'Play Rock Paper Scissor with another user.',
        dm_permission: false,
        options: [
            {
                name: 'user',
                description: 'The user you want to play with.',
                type: ApplicationCommandOptionType.User,
                requrie: true
            }
        ]
    },
    /**
     * 
     * @param {Object} param0 
     * @param {ChatInputCommandInteraction} param0.interaction
     */
    run: async ({ interaction }) => {
        try {
            const targetUser = interaction.options.getUser('user');
            if (interaction.user.id === targetUser.id) {
                interaction.reply({ content: `You wanna play with yourself? **Pathetic!**` });
                return;
            } else if (targetUser.bot) {
                interaction.reply({ content: `You lost already, dont play with a bot kid` });
                return;
            }

            const embedBuilder = new EmbedBuilder()
                .setTitle('Rock Paper Scissor')
                .setDescription(`It's currently ${targetUser}'s turn.`)
                .setColor('Yellow')
                .setTimestamp(new Date());

            const buttons = choices.map((choice) => {
                return new ButtonBuilder()
                    .setCustomId(choice.name)
                    .setLabel(choice.name)
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji(choice.emoji)
            });

            const row = new ActionRowBuilder().addComponents(buttons);

            const reply = await interaction.reply({
                content: `${targetUser}, you have been challenge to a game of Rock Paper Scissor, by ${interaction.user}. To start playing click one of the buttons below.\n-# You have 30 seconds to pick.`,
                embeds: [embedBuilder],
                components: [row]
            });

            const targetUserInteraction = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === targetUser.id,
                time: 30_000,
            }).catch(async (error) => {
                embedBuilder.setDescription(`${interaction.user} Won. ${targetUser} did not respond in time.`);
                await reply.edit({ embeds: [embedBuilder], components: [] });
            });

            if (!targetUserInteraction) return;

            const targetUserChoice = choices.find(
                (choice) => choice.name === targetUserInteraction.customId
            );

            await targetUserInteraction.reply({
                content: `You pick ${targetUserChoice.name + targetUserChoice.emoji}`,
                ephemeral: true,
            });

            // Edit embed with updated user turn
            embedBuilder.setDescription(`It's now ${interaction.user}'s turn`);
            await reply.edit({
                content: `${interaction.user} it's your turn now.`,
                embeds: [embedBuilder],
            });

            const initialUserInteraction = await reply.awaitMessageComponent({
                filter: (i) => i.user.id === interaction.user.id,
                time: 30_000,
            }).catch(async (error) => {
                embedBuilder.setDescription(`${targetUser} Won. ${interaction.user} did not respond in time.`);
                await reply.edit({ embeds: [embedBuilder], components: [] });
            });

            if (!initialUserInteraction) return;

            const initialUserChoice = choices.find(
                (choice) => choice.name === initialUserInteraction.customId
            );

            let result;

            if (targetUserChoice.beats === initialUserChoice.name) {
                result = `${targetUser} won!`;
            }

            if (initialUserChoice.beats === targetUserChoice.name) {
                result = `${interaction.user} won!`;
            }

            if (targetUserChoice.name === initialUserChoice.name) {
                result = `It was a tie!`;
            }

            embedBuilder.setDescription(
                `${targetUser} picked ${targetUserChoice.name + targetUserChoice.emoji}\n${interaction.user} picked ${initialUserChoice.name + initialUserChoice.emoji}\n\n**${result}**`
            );

            reply.edit({ embeds: [embedBuilder], components: [] });
        } catch (error) {
            console.log('Error with command');
            console.log(error);
        }
    }
}