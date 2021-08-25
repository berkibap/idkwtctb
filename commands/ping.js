const Discord = require('discord.js');

exports.run = (client, message, args) => {
    message.reply(`Last roundtrip to Discord was **${client.ws.ping} ms**`);        
}
exports.name = "ping";
