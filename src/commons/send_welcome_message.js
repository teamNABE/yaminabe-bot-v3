const {GuildMember, EmbedBuilder} = require("discord.js")
const config = require("../config");


/**
 *
 * @param {GuildMember}member
 * @todo プレースホルダを実装
 */
const send_welcome_message = async (member)=>{
    const welcome_message_channel_id = await config.get_value(config.setting_value.WELCOME_MESSAGE_CHANNEL_ID)
    const welcome_message = await config.get_value(config.setting_value.WELCOME_MESSAGE)

    const client = member.client

    if(welcome_message_channel_id && welcome_message){
        const system_log_channel = await client.channels.fetch(welcome_message_channel_id);
        await system_log_channel.send(welcome_message)
    }
}

exports.send_welcome_message = send_welcome_message
