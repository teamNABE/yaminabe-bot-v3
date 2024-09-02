'use strict'

const {Client} = require("discord.js")
const package_json = require("../package.json")
require("dotenv-safe").config();


const debug_mode = process.env.NODE_ENV==="development";
if (debug_mode) {
    console.info("debug mode")
    process.env.DEBUG = `${package_json.name}:*`
}

const client = new Client({intents:[]})

process.on("exit", ()=>{
    client.destroy();
    console.info("Exiting...");
});
process.on("SIGINT", ()=>{
    process.exit(0);
});

client.once("ready", async (c) =>{
    console.info(`Login! ${c.user.tag}`)
})

client.login(process.env.DISCORD_BOT_TOKEN)
    .catch(e => {
        console.error("Error! Cannot login Discord.")
        console.error(e)
    })
