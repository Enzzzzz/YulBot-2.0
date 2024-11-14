const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField, ChannelType } = require("discord.js");
const { ChatLockLang } = require("../../Language/chatLockLang.js");
const Guild = require("../../Schema/servers.js");

module.exports = {
  name: "unlock",
  description: "Unock a channel.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "channel",
      description: "Unlock this channel",
      type: ApplicationCommandOptionType.Channel,
      channelTypes: [ChannelType.GuildText],
    },
  ],
  userPerms: ["ManageChannels"],
  botPerms: ["ManageChannels"],

  run: async (client, interaction) => {
    const guildData = await Guild.findOne({ guildID: interaction.guild.id });

    if (guildData === null) {
      console.log("Nenhuma configuração encontrada para o servidor.");
      return;
    }

    const language = ChatLockLang[guildData.language];
    const channelId = interaction.guild.channels.cache.get(interaction.channel.id);

    const channel = interaction.options.getChannel("channel") || interaction.channel;

    await channel.permissionOverwrites.edit(interaction.guild.id, {
      [PermissionsBitField.Flags.SendMessages]: true,
    });


    const embed = new EmbedBuilder()
      .setTitle(language.unlockEmbedTitle)
      .setDescription(language.unlockEmbedDesc)
      .setColor("#FF0000")
      .setTimestamp();

    const logChannel = interaction.guild.channels.cache.get(guildData.logChannelID);
    const embedLog = new EmbedBuilder()
      .setTitle(`${language.logEmbedTitle}`)
      .setDescription(
        `**${interaction.user}** ${language.logEmbedDesc} <#${channelId.id}>`
      )
      .setColor("#9930FF")
      .setThumbnail(client.user.displayAvatarURL())
      .setTimestamp();

    if (logChannel) logChannel.send({ embeds: [embedLog] });

    await channel.send({ embeds: [embed] });
    await interaction.reply({ content: `${language.unlockEmbedTitle}`, ephemeral: true})
  },
};
