const client = require('..');
const { EmbedBuilder, ButtonBuilder, ActionRowBuilder } = require('discord.js');

client.on('guildCreate', async (guild) => {
    try {
      const owner = await guild.members.fetch(guild.ownerId);
            const Buttons = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setLabel('Dashboard')
                    .setURL('https://yulbot.vercel.app')
                    .setStyle(5)
                    .setEmoji('🎛️'),
                new ButtonBuilder()
                    .setLabel('Stats Page')
                    .setURL('https://yulbot.vercel.app/status')
                    .setStyle(5)
                    .setEmoji('📊')
            )          
            const embed = new EmbedBuilder()
            .setTitle("Obrigado por me adicionar ao seu servidor!")
            .setDescription("Eu fui criada para te fornecer o máximo de ajuda em seu servidor.\nVocê pode me configurar através de comandos ou pelo meu Dashboard.")
            .setThumbnail(owner.guild.iconURL())
            .setTimestamp()
            .setColor('#ae21ff');

    await owner.send({ embeds: [embed], components: [Buttons] });
    
      console.log(`Mensagem enviada para o dono do servidor ${guild.name}`);
    } catch (error) {
      console.error('Erro ao enviar mensagem para o dono do servidor:', error);
    }
});