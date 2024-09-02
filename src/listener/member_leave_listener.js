const {Client} = require("discord.js")

const {leave} = require("../commons/activity_notification/member_join_leave")

/**
 * @param {Client}client
 */
module.exports = (client)=>{
    client.on("guildMemberRemove", async member => {
        await leave(member)
    });
}
