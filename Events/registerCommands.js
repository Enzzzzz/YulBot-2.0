// const fetch = require('node-fetch');
// const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

// const url = 'https://discord.com/api/v10/applications/1181632410492866610/commands';

// const commands = [
//     {
//         name: 'giveaway',
//         type: ApplicationCommandType.ChatInput,
//         description: 'Te dá 2k'
//     },
//     {
//         name: 'gif',
//         type: ApplicationCommandType.ChatInput,
//         description: 'Mande gif.',
//         options: [
//             {
//               name: "gif",
//               type: ApplicationCommandOptionType.String,
//               description: "Digite o que deseja pesquisar",
//               required: true
//             }
//         ]
//     }
// ];

// const headers = {
//     'Authorization': `Bot ${process.env.TOKEN}`,
//     'Content-Type': 'application/json'
// };

// async function registerCommand(command) {
//     try {
//         const response = await fetch(url, {
//             method: 'POST',
//             headers: headers,
//             body: JSON.stringify(command)
//         });

//         if (response.ok) {
//             console.log(`Comando "${command.name}" registrado com sucesso!`);
//         } else {
//             const data = await response.json();
//             console.log(`Erro ao registrar comando "${command.name}":`, response.status, data);
//         }
//     } catch (error) {
//         console.error(`Erro na requisição ao registrar comando "${command.name}":`, error);
//     }
// }

// async function registerAllCommands() {
//     for (const command of commands) {
//         await registerCommand(command);
//     }
// }

// registerAllCommands();
