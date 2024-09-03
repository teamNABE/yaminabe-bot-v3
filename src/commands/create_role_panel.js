const {SlashCommandBuilder, EmbedBuilder, MessageButton, ActionRowBuilder} = require('discord.js');
const {ChannelType} = require("discord-api-types/payloads/v10")
const {send_embed_to_system_log_channel} = require("../modules/send_systemlog");
const {command_color, system_color} = require("../commons/embed_color")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-role-panel')
        .setDescription('ロールパネルを作成します。')
        .addChannelOption(option=>
            option.setName("channel")
                .setDescription("チャンネルを指定します。(指定しない場合は送信したチャンネル)")
                .addChannelTypes(ChannelType.GuildText)
        ),
    async execute(interaction) {
        const send_channel = await interaction.guild.channels.fetch(interaction.channelId);
        const option_set_channel = interaction.options.getChannel("channel", false, [ChannelType.GuildText])

        const target_channel = option_set_channel ? option_set_channel : send_channel;

        try{
            const button  = new MessageButton()
                .setCustomId("role_panel")
                .setStyle("PRIMARY")
                .setLabel("ロールを付ける")

            const register = new ActionRowBuilder()
                .addComponents(button);

            const panel_embed = new EmbedBuilder()
                .setTitle("ロール付与パネル")
                .setDescription(`プレイしているゲームや興味のあることなど、好きなロールを自分につけることができます！\nメッセージの下にあるボタンを押してロールを付けよう！`)
                .setColor('#9aec9f')
                .setTimestamp()

            await target_channel.send({embeds: [panel_embed], components:[register]})

            const guild = await interaction.guild.fetch();
            const sender = await guild.members.fetch(interaction.member.user.id,{
                force: true // intentsによってはGuildMemberUpdateが配信されないため
            });

            const embed = new EmbedBuilder()
                .setTitle("ロール付与パネルを作成しました")
                .setFields(
                    {name: "チャンネル", value: `<#${target_channel.id}>\n(${target_channel.name} = ${target_channel.id})`},
                )
                .setColor(command_color.SUCCESS)
                .setTimestamp()
            await interaction.reply({embeds: [embed], ephemeral: true});

            embed.addFields({name: "実行者", value: `<@${sender.user.id}>\n(${sender.user.tag} = ${ender.user.id})`})
            embed.setColor(system_color.INFO)
            await send_embed_to_system_log_channel(embed)
        }catch (e) {
            console.error(e)

            const embed = new EmbedBuilder()
                .setTitle("エラーが発生しました")
                .setDescription(e instanceof ErrorMessage ? e.get_message(): "")
                .setColor(command_color.FAIL)
                .setTimestamp()

            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    },
};