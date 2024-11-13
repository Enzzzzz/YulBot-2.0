const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { WelcomeLang } = require('../../Language/setWelcomeLang.js');
const Guild = require('../../Schema/servers.js');

module.exports = {
    name: "setwelcome",
    aliases: ["sw"],
    description: "⚒️ Set a channel for welcome messages",
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

        const language = WelcomeLang[guildData.language]
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
            guildData.welcomeChannelID = channel.id;
            await guildData.save();

            return interaction.reply({
                content: `${language.success} <#${channel.id}>.`,
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