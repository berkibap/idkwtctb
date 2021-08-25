const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        'GUILDS','GUILD_MESSAGES'
    ]
});
const fs = require('fs');

const config = require('./config.json');

client.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    });
});


client.on("message", message => {
    let args = message.content.substring(config.prefix.length).split(" ");
    let cmd = args[0];
    args = args.splice(1);
    client.commands.get(cmd).run(client, message, args);
    
});
client.on("ready", () => {
    client.guilds.fetch().then(guilds => {
        console.log(`${client.user.tag} is online in ${guilds.size} guilds.`);
    });
    
});
client.login(config.token);