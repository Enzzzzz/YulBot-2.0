const client = require("..");
const User = require("../Schema/user.js");
const cooldowns = new Map();
const { EmbedBuilder } = require("discord.js");
const Guild = require('../Schema/servers.js');
const { LevelLang } = require('../Language/setLevelLang.js');


const XP_PER_MESSAGE = 3;
const COOLDOWN_SECONDS = 20;

function calculateLevel(xp) {
  return Math.floor(0.1 * Math.sqrt(xp));
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  const userId = message.author.id;
  const userName = message.author.username;
  const guildId = message.guild.id;
  const guildName = message.guild.name;

  if (cooldowns.has(userId)) {
    const lastMessageTime = cooldowns.get(userId);
    const now = Date.now();

    if (now - lastMessageTime < COOLDOWN_SECONDS * 1000) {
      return;
    }
  }

  cooldowns.set(userId, Date.now());

  let user = await User.findOne({ userId });

  if (!user) {
    user = new User({
      userId,
      userName,
      global: { messagesSent: 0, xp: 0, level: 0 },
      guilds: [],
      igns: []
    });
  }

  user.global.messagesSent += 1;
  user.global.xp += XP_PER_MESSAGE;
  user.global.level = calculateLevel(user.global.xp);

  const guildData = user.guilds.find((g) => g.guildId === guildId);

  if (guildData) {
    guildData.messagesSent += 1;
    guildData.xp += XP_PER_MESSAGE;
    const oldGuildLevel = guildData.level;
    guildData.level = calculateLevel(guildData.xp);

    const levelUp = oldGuildLevel < guildData.level;

    const guildSettings = await Guild.findOne({ guildID: guildId });
    const levelUpChannelID = guildSettings.levelChannelID;
    const language = LevelLang[guildSettings.language]
    if (levelUp) {
      const levelUpEmbed = new EmbedBuilder()
        .setColor("#9900FF")
        .setTitle("Level UP!")
        .setDescription(
          `${message.author} ${language.levelUpEmbed} \`${guildData.level}\`! 🎉`
        )
        .setTimestamp()
        .setFooter({ text: "Yul - Level System" });

      

      // Enviar a mensagem no canal de level
      const channel = await message.guild.channels.fetch(levelUpChannelID);
      if (channel) {
        channel.send({ embeds: [levelUpEmbed], content: `${message.author}` });
      }
    }
  } else {
    user.guilds.push({
      guildId,
      guildName,
      messagesSent: 1,
      xp: XP_PER_MESSAGE,
      level: 0,
    });
  }

  await user.save();
});
