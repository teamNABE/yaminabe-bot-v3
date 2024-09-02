const {Client, EmbedBuilder} = require("discord.js")
const {command_color} = require("../commons/embed_color")

/**
 * @param {Client}client
 */
module.exports = (client)=>{
    client.on("interactionCreate", async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`"${interaction.commandName}" is not found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            const embed = new EmbedBuilder()
                .setTitle("エラーが発生しました")
                .setDescription("コマンド実行中にエラーが発生しました。")
                .setColor(command_color.FAIL)
                .setTimestamp()

            await interaction.reply({embeds: [embed], ephemeral: true});
        }
    });
}
