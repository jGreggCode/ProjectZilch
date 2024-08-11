const { ActivityType } = require('discord.js');

module.exports = (c, client, handler) => {
    console.log(`${c.user.username} is ready!`);

    let status = [
        {
            name: "to voice channels",
            type: ActivityType.Listening,
        },
        {
            name: "the server",
            type: ActivityType.Watching,
        },
        {
            name: "Mike Shervin Lontok",
            type: ActivityType.Watching,
            url: "https://www.facebook.com/mikeshervin.lontok"
        },
    ]

    setInterval(() => {
        let random = Math.floor(Math.random() * status.length);
        client.user.setActivity(status[random]);
    }, 10000)
};