const { EmbedBuilder } = require('discord.js');
const client = require('..');
const { MemberJoinLang } = require('../Language/memberJoinLang.js');

client.on("guildMemberAdd", async (member) => {
    const welcomeChannel = member.guild.channels.cache.get('1181639980376916078');
    if (welcomeChannel) {
        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setTitle(`${MemberJoinLang.en.welcomeTitle}, @${member.user.username}`)
          .setDescription(MemberJoinLang.en.welcomeDescription)
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp();
    
        welcomeChannel.send({ embeds: [embed] });
    }
}); 