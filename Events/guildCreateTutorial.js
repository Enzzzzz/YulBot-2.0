const client = require('..');
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const Guild = require('../Schema/servers.js');

client.on('guildCreate', async (guild) => {
    try {

        const tutorialChannel = await guild.channels.create({
            name: 'config-tutorial',
            type: 0,
            position: 0,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id: guild.members.me.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                }
            ]
        });
        const tutorialMessageOne = new EmbedBuilder()
            .setTitle('Esse é o meu tutorial de configuração.')
            .setDescription('Aqui eu vou explicar quais são as minhas configurações e para que servem todas elas.\nNa próxima mensagem voce pode ver as minhas configurações atuais para esse servidor, embora não tenha nenhuma, você pode vizualizar em outro momento usando o comando \`/config\`.\n\nInicialmente eu tenho alguns comandos setáveis e você pode escolher utiliza-los ou não, caso tenha algum outro bot com a mesma função, não ficarei brava! Segue a lista dos meus comandos de configuração:\n\`\/setWelcome`\: Esse comando define um canal para que eu dê as boas vindas aos novos membros do servidor, lembrando, se voce já tem um bot com essa função, não precisa digitar esse comando.\n\n\`/setLevel\`: Esse comando define um canal para que eu anuncie quando um membro sobe de nível, se não for definido, o meu sistema de nível continuará funcionando furtivamente sem enviar mensagens porque os XPs ganhos também irão para o meu sistema de nível global.\n\n\`/setLog\`: Esse comando define um canal para que eu registre o uso dos meus comandos importantes ou comandos que modifiquem o servidor, mais precisamente, comandos de moderação.\n\n\✳️`/setLanguage\`: Esse comando define a linguagem em que eu vou estar funcionando nesse servidor, atualmente eu funciono em 3 linguagens: :flag_br: \`Portugues\` :flag_us: \`Ingles\` e :flag_cn: \`Chines\`\n\n**ESCOLHA A LINGUAGEM ABAIXO PARA LER ESSA MENSAGEM NO SEU IDIOMA**.')
            .setColor('#9900FF')
            .setTimestamp();

        const tutorialMessageTwo = new EmbedBuilder()
        .setTitle('Configurações Atuais')
        .setDescription(`\`\``)
        .setTimestamp();

        await tutorialChannel.send({ embeds: [tutorialMessageOne] });
        await tutorialChannel.send({ embeds: [tutorialMessageTwo] });

    } catch (error) {
        console.error('Erro ao enviar mensagem tutorial', error);
    }
});