const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { LevelLang } = require('../../Language/setLevelLang.js');
const Guild = require('../../Schema/servers.js');

module.exports = {
    name: "setlevel",
    description: "⚒️ Set a channel for server level logs",
    type: ApplicationCommandType.ChatInput,
    category: "Set",
    options: [
        {
          name: "channelid",
          type: ApplicationCommandOptionType.Channel,
          description: "Select the channel",
          required: true
        }
    ],
    userPerms: ['ManageChannels'],
    run: async (client, interaction) => {
        const channel = interaction.options.getChannel('channelid')
        const guildData = await Guild.findOne({ guildID: interaction.guild.id });
        const channelId = interaction.guild.channels.cache.get(interaction.channel.id);

        const language = LevelLang[guildData.language]
        if (!channel) {
            return interaction.reply({
                content: language.noChannel,
                ephemeral: true
            });
        }

        if (!guildData) {
            return interaction.reply({
                content: language.notFound,
                ephemeral: true
            });
        }

        try {
            guildData.levelChannelID = channel.id;
            await guildData.save();

            const levelChannel = interaction.guild.channels.cache.get(guildData.levelChannelID);
            const logChannel = interaction.guild.channels.cache.get(guildData.logChannelID);

            const embed = new EmbedBuilder()
                .setTitle(`${language.success} <#${channel.id}>`)
                .setDescription(`${language.desc} <#${channel.id}>`)
                .setColor('#9930FF')
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();

                const embedLog = new EmbedBuilder()
                .setTitle(`${language.logEmbedTitle}`)
                .setDescription(`**${interaction.user}** ${language.logEmbedDesc} <#${channelId.id}>`)
                .setColor('#9930FF')
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();
            
            if (levelChannel) levelChannel.send({ embeds: [embedLog] })
            if (logChannel) logChannel.send({ embeds: [embedLog] })

            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } catch (error) {
            console.error('Erro ao atualizar o canal:', error);
            return interaction.reply({
                content: language.invalidChannel,
                ephemeral: true
            });
        }
    }
};