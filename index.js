const Discord = require('discord.js')
const fs = require('fs')
const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldowns = new Discord.Collection();

const modules = [
    "Moderation",
    "Info",
    "Fun"
]
modules.forEach(c => {
fs.readdir(`./commands/${c}`, (e, f) => {
    if(e) return console.error(e);
    f.forEach(file => {
        if(!file.endsWith(".js")) return
        console.log(`[Commandlogs] Loaded ${file} command of module ${c}`);
        let cmd = require(`./commands/${c}/${file}`);
        let cmdName = cmd.config.name;
        client.commands.set(cmdName, cmd)
        cmd.config.aliases.forEach(alias => {
            client.aliases.set(alias, cmdName);
        })
    })
})
})

client.on("ready", () => {
  console.log("i am ready")
  client.user.setPresence({ activity: { name:"#help",  type: 'WATCHING'}, status: "idle" })
})

client.on("message", async(message) => {

 let prefix = "#"

if(!message.content.startsWith(prefix) || message.author.bot) return
const args = message.content.slice(prefix.length).trim().split(/ +/g)

    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if(!client.cooldowns.has(cmd.config.name)) {
        client.cooldowns.set(cmd.config.name, new Discord.Collection());
    }

    const now = Date.now();
  const timestamps = client.cooldowns.get(cmd.config.name);
  const cooldownAmount = (cmd.config.cooldown || 3) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        return message.reply( `please wait ${timeLeft.toFixed(1)} more second(s) before using \`${
            cmd.config.name
          }\` command again.`
          );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    if(!cmd) return;

    try {
        cmd.run(client, message, args, prefix);
    }catch (err){
        return console.error(err)
    }
})

client.login(process.env.token)