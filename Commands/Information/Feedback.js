const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'feedback',
    description: "[💎] Envie sua sugestão para o meu criador. Isso ajudará no meu crescimento! 🟢",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
          name: "sugestao",
          type: ApplicationCommandOptionType.String,
          description: "[🥰] Envie sua sugestão ou crítica para o meu criador.",
          required: true
        }
      ],


    run: async (client, interaction) => {

        const fb_channel = client.channels.cache.get('1013662960436129812');
        const fb = interaction.options.getString("sugestao");
        const reply_embed = new EmbedBuilder()
            .setTitle("Sucesso!")
            .setDescription(
                "Sua sugestão foi enviada com sucesso para o meu criador!\nObrigada por enviar ideias e críticas para que eu continue melhorando 🥰"
            )
            .setColor('#99FF99');


            const fb_embed = new EmbedBuilder()
            .setTitle("Nova sugestão recebida!")
            .addFields(
              {
                name: "Servidor",
                value: `${interaction.guild.name}`
              },
              {
                name: "Usuário",
                value: `**${interaction.user.username}**`
              },
              {
                name: "Sugestão",
                value: `${fb}`
              }
            )
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
            .setColor('#99FF99');
      
          interaction.reply({ embeds: [reply_embed], ephemeral: true });
          fb_channel.send({ embeds: [fb_embed] });

    }
};
