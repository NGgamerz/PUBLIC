const { MessageEmbed } = require('discord.js');

module.exports.run = (client, message, args) => {
    if (message.member.permissions.has("MANAGE_MESSAGES")) {
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("<a:no:858338739486720020> Please enter the amount of messages to delete!")
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        if (!args[0]) return message.channel.send(embed);
    
        const embed2 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("<a:no:858338739486720020> Please enter a real number!")
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        if (isNaN(args[0])) return message.channel.send(embed2);
    
        const embed3 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("<a:no:858338739486720020> You can't delete more than 100 messages at once!")
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        if (args[0] > 100) return message.channel.send(embed3);

        const embed4 = new MessageEmbed()
        .setColor("RANDOM")
        .setDescription("<a:no:858338739486720020> You have to delete at least one message!")
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        if (args[0] < 1) return message.channel.send(embed4);

    message.channel.messages.fetch({ limit: args[0] }).then(messages => {
        message.channel.bulkDelete(messages);
        const embed = new MessageEmbed()
        .setTitle("<a:tick:858338607882698772> Success")
        .setColor("RANDOM")
        .setDescription(`Successfully deleted **${args[0]}** messages`)
        .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
        .setTimestamp()
        message.channel.send(embed)
            .then(msg => {
                msg.delete({ timeout: 2500 })
            })
    });
} else {
    const embed = new MessageEmbed()
    .setColor("RANDOM")
    .setDescription("<a:no:858338739486720020> You don't have permissions to delete messages")
    .setFooter(`${message.author.tag} (${message.author.id})`, message.author.displayAvatarURL({dynamic : true}))
    .setTimestamp()
    message.channel.send(embed);
    }
}

    module.exports.config = {
        name: "purge",
        aliases: [],
        cooldown: 6,
        group: "Moderation",
}