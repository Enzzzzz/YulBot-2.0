const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { KickLang } = require('../../Language/kickLang.js');
const Guild = require('../../Schema/servers.js');


module.exports = {
    name: 'kick',
    description: "❌ Kick someone from the server",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
          name: "username",
          type: ApplicationCommandOptionType.User,
          description: "Type the username",
          required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "Reason for the kick",
            required: false
        }
    ],
    userPerms: ['KickMembers'],
    botPerms: ['KickMembers'],
    ownerOnly: false,
    run: async (client, interaction) => {
        const guildData = await Guild.findOne({ guildID: interaction.guild.id });

        if (guildData === null) {
            console.log('Nenhuma configuração encontrada para o servidor.');
            return;
          }

        const language = KickLang[guildData.language]
        const channelId = interaction.guild.channels.cache.get(interaction.channel.id);

        const user = interaction.options.getUser('username');
        const reason = interaction.options.getString('reason') || `${language.noReason}`;

        const serverName = interaction.guild.name;
        const serverIcon = interaction.guild.iconURL();

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            const noMember = new EmbedBuilder()
					.setDescription(language.userNotMember)
					.setColor('Red')
            return interaction.reply({ embeds: [ noMember ], ephemeral: true });
        }

        if (interaction.user.id === member.id) {
            const yourselfKick = new EmbedBuilder()
					.setDescription(language.cannotKickYourself)
					.setColor('Red')
            return interaction.reply({ embeds: [yourselfKick], ephemeral: true})
        }

        if (!interaction.member.permissions.has('KickMembers')) {
            const noPerm = new EmbedBuilder()
					.setDescription(language.noPermission)
					.setColor('Red')
            return interaction.reply({ embeds: [noPerm], ephemeral: true });
        }

        if (member.permissions.has('Administrator')) {
            const kickAdm = new EmbedBuilder()
					.setDescription(language.cannotKickAdmin)
					.setColor('Red')
            return interaction.reply({ embeds: [kickAdm], ephemeral: true });
        }

        try {
            await member.kick(reason);

            const kick_embed = new EmbedBuilder()
                .setTitle(`${user.username} ${language.kickSuccessTitle}`)
                .setDescription(`${language.kickSuccessDescription} ${reason}`)
                .setColor('#990000')
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: "User:", value: `${user.tag}` },
                    { name: `${language.action}`, value: `${language.actionText}` }
                )
                .setTimestamp();

            const kick_embed_DM = new EmbedBuilder()
                .setTitle(`${language.kickEmbedDMTitle} ${serverName}`)
                .setDescription(`${language.kickEmbedDMReason} ${reason}`)
                .setColor('#990000')
                .setThumbnail(serverIcon)
                .addFields(
                    { name: "**User:**", value: `${user.tag}` },
                    { name: `${language.action}`, value: `${language.actionText}` },
                    { name: `${language.kickEmbedDMKickedBy}`, value: `${interaction.user.tag}`}
                )
                .setTimestamp();

            interaction.reply({ embeds: [kick_embed], ephemeral: true });
            member.send({ embeds: [kick_embed_DM]})

            const logChannel = interaction.guild.channels.cache.get(guildData.logChannelID);
            const embedLog = new EmbedBuilder()
                .setTitle(`${language.logEmbedTitle}`)
                .setDescription(`**${interaction.user}** ${language.logEmbedDesc} <#${channelId.id}> ${language.logEmbedDesc2} **${user.tag}**`)
                .setColor('#990000')
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();
            
            if (logChannel) logChannel.send({ embeds: [embedLog] })

        } catch (error) {
            console.error(error);
            interaction.reply({ content: `${language.permissionError}`, ephemeral: true });
        }
    }
};
