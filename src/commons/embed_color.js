const {ColorResolvable} = require("discord.js")
/**
 * @enum {ColorResolvable}
 */
const notification_color = {
    JOIN: "#13c78b",
    LEAVE: "#d00000",
}

/**
 * @enum {ColorResolvable}
 */
const system_color = {
    INFO: "#06f919",
    ERROR: "#ff0000",
}

/**
 * @enum {ColorResolvable}
 */
const command_color = {
    SUCCESS: "#23de2d",
    FAIL: "#ea5a59",
    ADD: "#a7f1a9",
    REMOVE: "#f3ad9d",
}
exports.notification_color = notification_color
exports.system_color = system_color
exports.command_color = command_color
