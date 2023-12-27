const { EmbedBuilder } = require('discord.js');
const client = require('..');

client.on("guildMemberAdd", async (member) => {
    const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'teste');
    if (welcomeChannel) {
        const embed = new EmbedBuilder()
          .setColor('#00ff00')
          .setTitle(`Bem-vindo ao servidor, ${member.user.tag}!`)
          .setDescription('Esperamos que você aproveite o nosso servidor.')
          .setThumbnail(member.user.displayAvatarURL())
          .setTimestamp();
    
        welcomeChannel.send({ embeds: [embed] });
    }
}); 