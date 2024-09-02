const { ChannelType } = require("discord-api-types/payloads/v10")
const db = require("./utils/db")

const setting_values_channels_type = {
    SYSTEM_LOG_CHANNEL_ID: ChannelType.GuildText,
}

/**
 * @enum {string}
 */
const setting_value = {
    SYSTEM_LOG_CHANNEL_ID: "SYSTEM_LOG_CHANNEL_ID",
    WELCOME_MESSAGE_CHANNEL_ID: "WELCOME_MESSAGE_CHANNEL_ID",
    WELCOME_MESSAGE: "WELCOME_MESSAGE",
}

const init = async () => {
    for(let key in setting_value){
        const res = await db.get_first("SELECT * FROM setting_values WHERE key LIKE ?", [key])
        if(res) continue;
        db.execute("INSERT INTO setting_values(key, value) VALUES (?,?)", [key, null])
    }
}

/**
 *
 * @param {setting_value} key
 * @param {string} value
 */
const set_value = (key, value)=>{
    db.execute("UPDATE setting_values SET value=? WHERE key LIKE ?", [value, key])
}

/**
 *
 * @param {setting_value}key
 * @return {Promise<string|undefined>}
 */
const get_value = async (key)=>{
    const res = await db.get_first("SELECT value FROM setting_values WHERE key LIKE ?", [key])
    return res?.value;
}


exports.setting_values_channels_type = setting_values_channels_type
exports.setting_value = setting_value
exports.init = init
exports.set_value = set_value
exports.get_value = get_value
