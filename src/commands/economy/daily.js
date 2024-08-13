const { Client, Interaction, EmbedBuilder } = require('discord.js');
const { economy } = require('../../../Utils/config.json');
const User = require('../../models/Users');

const dailyAmount = 500;

module.exports = {
    data: {
        name: "daily",
        description: "Collect daily coins"
    },
    /**
     * 
     * @param {{ interaction: Interaction, client: Client, handler: any }} params
     */
    run: async (params) => {
        const { interaction, client, handler } = params;
        const profile = interaction.user;
        const icon = economy.icon;
        const embedBuilder = new EmbedBuilder()
            .setTitle(`Daily Coins`)
            .setFooter({ text: profile.username, iconURL: profile.displayAvatarURL() })
            .setTimestamp();

        if (!interaction.inGuild()) {
            interaction.reply({ content: "You can only run this command inside a server", ephemeral: true });
            return;
        }

        try {
            await interaction.deferReply();

            let query = {
                userId: interaction.member.id,
                guildId: interaction.guild.id,
            };

            let user = await User.findOne(query);

            if (user) {
                const lastDailyDate = user.lastDaily.toDateString();
                const currentDate = new Date().toDateString();

                if (lastDailyDate === currentDate) {
                    embedBuilder.setDescription("You have already collected your daily coins today, come back tomorrow!");
                    embedBuilder.setColor(`Red`)
                    interaction.editReply({ embeds: [embedBuilder] });
                    return;
                }

                user.lastDaily = new Date();
            } else {
                user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            await user.save();

            embedBuilder.setAuthor({ name: `Balance udpated`, iconURL: economy.iconBalanceUpdated });
            embedBuilder.setColor(`Green`);
            embedBuilder.addFields(
                { name: "Added", value: `**${icon} ${dailyAmount}**`, inline: true },
                { name: "New Balance", value: `**${icon} ${user.balance}**`, inline: true }
            )

            interaction.editReply({ embeds: [embedBuilder] });

        } catch (error) {
            console.log(`Error with daily: ${error}`);
        }
    }
}