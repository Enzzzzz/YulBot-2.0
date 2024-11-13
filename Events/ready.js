const client = require('..');
const chalk = require('chalk');
const ms = require('ms')
const { MongoClient } = require('mongodb');
const uri = process.env.DATABASE


const Mongo = new MongoClient(uri);
async function connectToDatabase() {
	try {
	  await Mongo.connect();
	  console.log(chalk.green('Conectado ao banco de dados'));
	} catch (err) {
	  console.error(chalk.red('Erro ao conectar ao banco de dados:', err));
	}
  }
connectToDatabase();

async function saveServerConfig(guildId, config) {
	const database = Mongo.db('Yulbot');
	const collection = database.collection('Data');
  
	try {
	  await collection.updateOne({ guildId }, { $set: config }, { upsert: true });
	  console.log('Configurações salvas com sucesso.');
	} catch (err) {
	  console.error(chalk.red('Erro ao salvar configurações:'), err);
	}
  }
  
  async function getServerConfig(guildId) {
	const database = Mongo.db('Yulbot');
	const collection = database.collection('Data');
  
	try {
	  const config = await collection.findOne({ guildId });
	  return config;
	} catch (err) {
	  console.error(chalk.red('Erro ao obter configurações:'), err);
	}
  }

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