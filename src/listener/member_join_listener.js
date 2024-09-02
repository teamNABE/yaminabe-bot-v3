const {Client} = require("discord.js")

const {join} = require("../commons/activity_notification/member_join_leave")
const {send_welcome_message} = require("../commons/send_welcome_message")

/**
 * @param {Client}client
 */
module.exports = (client)=>{
    client.on("guildMemberAdd", async member => {
        await join(member)
        await send_welcome_message(member)
    });
}
