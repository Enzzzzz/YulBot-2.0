const { EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const client = require('..');

const usuariosAutorizados = ['706206133324480572'];

client.on("messageCreate", async (message) => {
    if (message.guild && !message.author.bot) {
        const isAdmin = message.member.permissions.has(PermissionFlagsBits.Administrator);

    if (usuariosAutorizados.includes(message.author.id) || isAdmin) {

      return;
    }
        if (containsLink(message.content)) {
            const embed = new EmbedBuilder()
            .setTitle("Aviso 1/3")
            .setDescription("Você recebeu uma advertência por enviar um link sem permissão! ")
            .setThumbnail(message.guild.iconURL())
            .setTimestamp()
            .setColor('#FF0000');
            message.author.send({ embeds: [embed]});

            message.delete();
            console.log(`Mensagem deletada de ${message.author.username}.
            Conteúdo da mensagem : ${message.content}`)
        }
    }
});

function containsLink(text) {
    const linkRegex = /(http(s)?:\/\/[^\s]+)/gi;
    return linkRegex.test(text);
  }