const { ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'ping',
	description: "Veja o meu ping. 🟢",
	type: ApplicationCommandType.ChatInput,
	run: async (client, interaction) => {
		interaction.reply({ content: `Ping: **${Math.round(client.ws.ping)} ms**`, ephemeral: true })
	}
};