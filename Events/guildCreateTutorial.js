const client = require('..');
const { EmbedBuilder, PermissionsBitField } = require('discord.js')
const Guild = require('../Schema/servers.js');
const GuildCreateTutorialLang = require('../Language/guildCreateTutorialLang.js')

client.on('guildCreate', async (guild) => {
    try {

        const language = GuildCreateTutorialLang[guildData.language]

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
            .setTitle(`${language.embedOneTitle}`)
            .setDescription(`${language.embedOneDesc}`)
            .setColor('#9900FF')
            .setTimestamp();

        const tutorialMessageTwo = new EmbedBuilder()
        .setTitle(`${language.embedTwoTitle}`)
        .setDescription(`${language.embedTwoDesc}`)
        .setTimestamp();

        await tutorialChannel.send({ embeds: [tutorialMessageOne] });
        await tutorialChannel.send({ embeds: [tutorialMessageTwo] });

    } catch (error) {
        console.error('Erro ao enviar mensagem tutorial', error);
    }
});