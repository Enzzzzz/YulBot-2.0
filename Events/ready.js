const client = require('..');
const chalk = require('chalk');
const ms = require('ms')
const mongoose = require('mongoose');
const DATABASE = process.env.DATABASE


async function connectToDatabase() {
	try {
	  await mongoose.connect(DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	  });
	  console.log(chalk.green('Conectado ao banco de dados'));
	} catch (err) {
	  console.error(chalk.red('Erro ao conectar ao banco de dados:', err));
	}
  }
connectToDatabase();

async function saveServerConfig(guildId, config) {
	const Guild = require('../Schema/servers');
	try {
	  await Guild.updateOne({ guildID: guildId }, { $set: config }, { upsert: true });
	  console.log('Configurações salvas com sucesso.');
	} catch (err) {
	  console.error(chalk.red('Erro ao salvar configurações:'), err);
	}
  }
  
  async function getServerConfig(guildId) {
	const Guild = require('../Schema/servers');
	try {
	  const config = await Guild.findOne({ guildID: guildId });
	  return config;
	} catch (err) {
	  console.error(chalk.red('Erro ao obter configurações:'), err);
	}
  }

client.on('guildCreate', async (guild) => {
    console.log(chalk.yellow(`Bot entrou no servidor: ${guild.name} (${guild.id})`));

    const existingConfig = await getServerConfig(guild.id);

    if (!existingConfig) {
        const defaultConfig = {
            guildId: guild.id,
            guildName: guild.name,
            welcomeChannelID: null,
            memberCountChannelID: null,
            language: 'en',
            logChannelID: null,
            autoChannels: []
        };

        await saveServerConfig(guild.id, defaultConfig);
        console.log(chalk.green(`Configurações padrão salvas para o servidor: ${guild.name}`));
    } else {
        console.log(chalk.blue(`Servidor já registrado no banco de dados: ${guild.name}`));
    }
});

const activities_list = [
	`Online em ${client.guilds.cache.size} servidores`,  
	`Digite /help para ver meus comandos`,
	`Veja meus comandos Slash {/}`, 
	];

client.on("ready", () => {
	const { user, ws } = client;
	setInterval(() => {
		const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
		user.setActivity({ name: `${activities_list[index]}`, type: 3, })
	}, ms("5s"))

	console.log(chalk.black.bgMagenta(`${client.user.username} online!`))
});