const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const { LanguageLang } = require('../../Language/setLanguageLang.js');
const Guild = require('../../Schema/servers.js');

module.exports = {
    name: "setlanguage",
    description: "⚒️ Set the language for your server",
    type: ApplicationCommandType.ChatInput,
    category: "Set",
    options: [
        {
          name: "language",
          type: ApplicationCommandOptionType.String,
          description: "Select the language",
          required: true,
          choices: [
            {
              name: "English",
              value: "en"
            },
            {
              name: "Português",
              value: "pt"
            },
          ]
        }
    ],
    userPerms: ['ManageChannels'],
    run: async (client, interaction) => {
        const selectedLanguage = interaction.options.getString('language')
        const guildData = await Guild.findOne({ guildID: interaction.guild.id });     
        


        const guildId = interaction.guild.id;
        await Guild.findOneAndUpdate(
            { guildID: guildId },
            { $set: { language: selectedLanguage } },
            { upsert: true }
        );

        const language = LanguageLang[selectedLanguage]

        const embed = new EmbedBuilder()
                .setTitle(language.languageSelectedTitle)
                .setDescription(language.languageSelectedDescription)
                .setColor('#9930FF')
                .setThumbnail(client.user.displayAvatarURL())
                .setTimestamp();

        interaction.reply({ embeds: [embed] })
    }
};