const { Client, Interaction, EmbedBuilder } = require('discord.js');
const { guildIconURI } = require('../../../Utils/config.json');

module.exports = {
    data: {
        name: "quote",
        description: "Generate a random quote.",
    },
    /**
     * 
     * @param {{ interaction: Interaction, client: Client, handler: any }} params
     */
    run: async (params) => {
        const { interaction, client, handler } = params;
        const embedBuilder = new EmbedBuilder();
        let quoteText = "";
        let quoteTags = "";
        let quoteAuthor = "";

        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();

        quoteText = data.content;
        quoteTags = data.tags;
        quoteAuthor = `-- ${data.author}`;

        embedBuilder.setDescription(`### ${quoteTags}!\n\n> "*${quoteText}*"`);
        embedBuilder.setFooter({ text: `${quoteAuthor}`, iconURL: guildIconURI });
        embedBuilder.setColor(interaction.member.displayHexColor);
        embedBuilder.setTimestamp();

        interaction.reply({ embeds: [embedBuilder] });

        // For testing
        // console.log(`${quoteText} \n${quoteTags} \n${quoteAuthor}`);
    }
}