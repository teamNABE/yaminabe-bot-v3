const {GuildMember, EmbedBuilder} = require("discord.js")
const {send_embed_to_system_log_channel} = require("../../modules/send_systemlog")
const {notification_color} = require("../embed_color")

/**
 *
 * @param {GuildMember}member
 */
const join = async (member)=>{
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "メンバー参加",
            iconURL: member.displayAvatarURL()
        })
        .setDescription(`<@${member.id}> ${member.user.tag}`)
        .setImage( member.displayAvatarURL())
        .addFields(`アカウント作成日時`, `<t:${member.user.createdTimestamp}>`)
        .setColor(notification_color.JOIN)
        .setFooter(member.id)
        .setTimestamp()

    await send_embed_to_system_log_channel(embed);
}

/**
 *
 * @param {GuildMember}member
 */
const leave = async (member)=>{
    const embed = new EmbedBuilder()
        .setAuthor({
            name: "メンバー脱退",
            iconURL: member.displayAvatarURL()
        })
        .setDescription(`<@${member.id}> ${member.user.tag}`)
        .setImage( member.displayAvatarURL())
        .setColor(notification_color.LEAVE)
        .setFooter(member.id)
        .setTimestamp()

    await send_embed_to_system_log_channel(embed)
}

exports.join = join
exports.leave = leave
