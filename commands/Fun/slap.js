const DIG = require('discord-image-generation')
const { MessageAttachment } = require('discord.js')

module.exports.run = async (client, message, args) => {
const user = message.mentions.users.first() ||    message.author;

let avatar = user.displayAvatarURL({ dynamic: false, format: 'png' });

let av = message.author.displayAvatarURL({ dynamic: false, format: 'png' });

let img = await new DIG.Batslap().getImage(av, avatar)

let attach = new MessageAttachment(img, 'slap.png')
message.channel.send(attach)
}

module.exports.config = {
  name: "slap",
  aliases: [],
  cooldown: 3,
  group: "Fun"
}