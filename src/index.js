'use strict'

const {Client, EmbedBuilder, GatewayIntentBits} = require("discord.js")
const package_json = require("../package.json")
require("dotenv-safe").config();

const db = require("./utils/db")
const config = require("./config")
const send_systemlog = require("./modules/send_systemlog")
const {system_color} = require("./commons/embed_color")

const debug_mode = process.env.NODE_ENV==="development";
if (debug_mode) {
    console.info("debug mode")
    process.env.DEBUG = `${package_json.name}:*`
}

db.init().then(r =>
    config.init()
)

const client = new Client({intents:[GatewayIntentBits.Guilds]})

process.on("exit", ()=>{
    client.destroy();
    console.info("Exiting...");
});
process.on("SIGINT", ()=>{
    process.exit(0);
});

client.once("ready", async (c) =>{
    console.info(`Login! ${c.user.tag}`)
    const embed = new EmbedBuilder()
        .setTitle(`${package_json.name}が起動しました`)
        .setColor(system_color.INFO)
        .setTimestamp()
    await send_systemlog.send_embed_to_system_log_channel(embed)
})

client.login(process.env.DISCORD_BOT_TOKEN)
    .catch(e => {
        console.error("Error! Cannot login Discord.")
        console.error(e)
    })
