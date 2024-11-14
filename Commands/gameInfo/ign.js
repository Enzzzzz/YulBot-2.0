const {
  ApplicationCommandType,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");
const { SetIgnLang } = require("../../Language/setIgnLang.js");
const User = require("../../Schema/user.js");
const Guild = require("../../Schema/servers.js");

module.exports = {
  name: "setign",
  description: "set your nick on any game that you play",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "ign",
      type: ApplicationCommandOptionType.String,
      description: "Type your ingame name",
      required: true,
    },
    {
      name: "game",
      type: ApplicationCommandOptionType.String,
      description: "Select your game",
      required: true,
      choices: [
        {
          name: "Riot",
          value: "riot",
        },
        {
          name: "Steam",
          value: "steam",
        },
        {
          name: "Epic",
          value: "epic",
        },
        {
          name: "Minecraft",
          value: "minecraft",
        },
        {
          name: "Ubisoft",
          value: "ubisoft",
        },
        {
          name: "Origin",
          value: "origin",
        },
        {
          name: "Rockstar",
          value: "rockstar",
        },
        {
          name: "Others",
          value: "others",
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    const ign = interaction.options.getString("ign");
    const game = interaction.options.getString("game-name");
    const userId = interaction.user.id;
    const userName = interaction.user.username;

    const guildData = await Guild.findOne({ guildID: interaction.guild.id });
    const language = SetIgnLang[guildData.language];

    const userData = await User.findOne({ userId: userId });

    if (!userData) {
      userData = new User({
        userId,
        userName,
        global: { messagesSent: 0, xp: 0, level: 0 },
        guilds: [],
        igns: [],
      });
    }

    const existingIgn = userData.igns.find((entry) => entry.game === game);

    if (existingIgn) {
      existingIgn.nick = ign;
    } else {
      userData.igns.push({
        game: game,
        nick: ign,
      });
    }

    await userData.save();

    const embed = new EmbedBuilder()
      .setTitle(`${language.embedTitle}`)
      .setDescription(`${language.embedDesc}`)
      .setColor("#9930FF")
      .setThumbnail(interaction.user.displayAvatarURL())
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
