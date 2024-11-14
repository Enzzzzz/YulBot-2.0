const client = require("..");
const { PermissionsBitField } = require("discord.js");
const Guild = require("../Schema/servers.js");
const { MemberCounterLang } = require("../Language/memberCounterLang.js");

client.on("guildCreate", async (guild) => {
  try {
    const guildData = await Guild.findOne({ guildID: guild.id });
    if (guildData === null) {
      console.log("Nenhuma configuração encontrada para o servidor.");
      return;
    }
    const language = MemberCounterLang[guildData.language];
    const newCategory = await guild.channels.create({
      name: "📊 Stats",
      type: 4,
      reason:
        "Categoria criada automaticamente quando o bot entrou no servidor",
      position: 0,
    });

    const memberCountChannel = await guild.channels.create({
      name: `${language.channelName} ${guild.memberCount}`,
      type: 2,
      parent: newCategory.id,
      reason:
        "Canal de voz criado automaticamente quando o bot entrou no servidor",
      position: 0,
    });

    const infoChannel = await guild.channels.create({
      name: `${language.channel2Name}`,
      type: 2,
      parent: newCategory.id,
      reason:
        "Canal de voz criado automaticamente quando o bot entrou no servidor",
      position: 1,
    });

    await memberCountChannel.permissionOverwrites.create(guild.id, {
      [PermissionsBitField.Flags.Connect]: false,
    });

    await infoChannel.permissionOverwrites.create(guild.id, {
      [PermissionsBitField.Flags.Connect]: false,
    });

    const guildId = guild.id;
    await Guild.findOneAndUpdate(
      { guildID: guildId },
      { $set: { memberCountChannelID: memberCountChannel.id } },
      { upsert: true }
    );
  } catch (error) {
    console.error("Erro ao criar o canal de voz:", error);
  }
});

client.on("ready", async () => {
  console.log(`${client.user.tag} está online e pronto!`);

  client.guilds.cache.forEach(async (guild) => {
    try {
      const guildData = await Guild.findOne({ guildID: guild.id });
      if (!guildData) {
        return;
      }

      const language = MemberCounterLang[guildData.language];
      const memberCountChannelID = guildData.memberCountChannelID;

      // Verifique se o canal existe inicialmente
      const channel = await guild.channels.fetch(memberCountChannelID);
      if (!channel) {
        return;
      }

      // Inicie o intervalo apenas uma vez por guilda
      setInterval(async () => {
        try {
          const updatedChannel = await guild.channels.fetch(memberCountChannelID);
          if (updatedChannel) {
            const memberCount = guild.memberCount;
            await updatedChannel.setName(`${language.channelName} ${memberCount}`);
          } else {
            return
          }
        } catch (error) {
          console.error(`Erro ao atualizar o nome do canal no servidor: ${guild.name}`, error);
        }
      }, 60000);

    } catch (error) {
      console.error(`Erro ao buscar configuração do servidor: ${guild.name}`, error);
    }
  });
});
