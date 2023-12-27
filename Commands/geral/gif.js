const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const axios = require('axios')

module.exports = {
    name: 'gif',
    description: "[🔎] Vou procurar um Gif para você! 🟢",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
          name: "gif",
          type: ApplicationCommandOptionType.String,
          description: "Digite o que deseja pesquisar",
          required: true
        }
      ],


    run: async (client, interaction) => {
        
        gif = interaction.options.getString('gif')
        let link = `https://tenor.googleapis.com/v2/search?q=${encodeURIComponent(gif)}&key=AIzaSyBykZU-sNFm-t4LQ5L3mUcvhD_y-vxcBJ8&client_key=my_test_app&limit=1`
        let { data } = await axios.get(link)
        ggif = data.results[0].media_formats.gif.url
        
        
        interaction.reply(ggif)

    }
};