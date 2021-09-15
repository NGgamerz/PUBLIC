const { MessageEmbed } = require('discord.js')

module.exports.run = async (client, message, args) => {
  const embed = new MessageEmbed()
    .setTitle("🏓・Pong!")
    .setColor("RANDOM")
    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    .addField("📨・Sending Messages:",`\`${Date.now() - message.createdTimestamp} ms\``,true)
    .addField("📡・Discord API:",`\`${Math.round(client.ws.ping)} ms\``,true)
    message.channel.send(embed);
}

module.exports.config = {
    name: "ping",
    aliases: [],
    cooldown: 3,
    group: "Info",
}