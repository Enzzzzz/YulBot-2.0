const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, PermissionsBitField } = require("discord.js");
const { ChatLockLang } = require("../../Language/chatLockLang.js");
const Guild = require("../../Schema/servers.js");

module.exports = {
  name: "lock",
  description: "Lock a channel.",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "channel",
      description: "Lock this channel",
      type: ApplicationCommandOptionType.Channel,
    },
    {
      name: "reason",
      description: "lock reason",
      type: ApplicationCommandOptionType.String,
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
    const reason = interaction.options.getString("reason") || language.lockReason;

    await channel.permissionOverwrites.edit(interaction.guild.id, {
      [PermissionsBitField.Flags.SendMessages]: false,
    });

    const adminRole = interaction.guild.roles.cache.find((role) =>
      role.permissions.has(PermissionsBitField.Flags.Administrator)
    );

    if (adminRole) {
      await channel.permissionOverwrites.edit(adminRole.id, {
        [PermissionsBitField.Flags.SendMessages]: true,
      });
    }

    const embed = new EmbedBuilder()
      .setTitle(language.lockEmbedTitle)
      .setDescription(language.lockEmbedDesc)
      .setColor("#FF0000")
      .addFields({
        name: `${language.lockEmbedReason}`,
        value: `${reason}`,
      })
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
    await interaction.reply({ content: `${language.lockEmbedTitle}`, ephemeral: true})
  },
};
