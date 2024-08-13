const { Client, Interaction } = require('discord.js');
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
                    interaction.editReply(
                        "You have already collected your daily coins today, come back tomorrow!"
                    );
                    return;
                }
            } else {
                user = new User({
                    ...query,
                    lastDaily: new Date(),
                });
            }

            user.balance += dailyAmount;
            await user.save();

            interaction.editReply(`\`${dailyAmount}\` was added to your balance. Your new balance is \`${user.balance}\``)

        } catch (error) {
            console.log(`Error with daily: ${error}`);
        }
    }
}