const { EmbedBuilder } = require('discord.js');
const client = require('..');
const { MemberJoinLang } = require('../Language/memberJoinLang.js');
const Guild = require('../Schema/servers.js');

client.on("guildMemberAdd", async (member) => {
  try {
    const guildData = await Guild.findOne({ guildID: member.guild.id });

    if (guildData === null) {
      console.log('Nenhuma configuração encontrada para o servidor.');
      return;
    }
    
    const language = MemberJoinLang[guildData.language]

    if (guildData.welcomeChannelID) {
      const welcomeChannel = member.guild.channels.cache.get(guildData.welcomeChannelID);
      if (welcomeChannel) {
        if (welcomeChannel) {
          const embed = new EmbedBuilder()
            .setColor('#00ff00')
            .setTitle(`${language.welcomeTitle}, ${member.user.globalName}`)
            .setDescription(language.welcomeDescription)
            .setThumbnail(member.user.displayAvatarURL())
            .setTimestamp();

          welcomeChannel.send({ embeds: [embed] });
      }
      } else {
          console.log('Canal de boas-vindas não encontrado.');
      }
  } else {
      console.log('Canal de boas-vindas não configurado.');
  }
  } catch (error) {
    console.error('Erro ao enviar mensagem de boas-vindas:', error);
}
}); 