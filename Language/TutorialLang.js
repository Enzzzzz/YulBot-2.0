const TutorialLang = {
  en: {
    embedOneTitle: "This is my configuration tutorial.",
    embedOneDesc:
      "Here, I will explain what my settings are and what they are used for.\nIn the next message, you can see my current settings for this server. Although there are no settings yet, you can view them later using the `/config` command.\n\nInitially, I have some configurable commands, and you can choose whether to use them or not. If you have another bot with the same function, I won't be upset! Here's a list of my configuration commands:\n`/setWelcome`: This command defines a channel where I will welcome new members to the server. If you already have a bot with this function, you don't need to use this command.\n\n`/setLevel`: This command sets a channel where I will announce when a member levels up. If not defined, my leveling system will continue working silently, as the XP earned will also go to my global leveling system.\n\n`/setLog`: This command defines a channel where I will log the use of important commands or commands that modify the server, specifically moderation commands.\n\n✳️`/setLanguage`: This command sets the language I will use in this server. I currently support three languages: :flag_us: `English`, :flag_br: `Portuguese`, and :flag_cn: `Chinese`.\n\n**CHOOSE YOUR LANGUAGE BELOW TO READ THIS MESSAGE IN YOUR LANGUAGE**.",
    embedTwoTitle: "Current Settings",
    embedTwoDesc: "No settings available at the moment.",
  },
  pt: {
    embedOneTitle: "Esse é o meu tutorial de configuração.",
    embedOneDesc:
      "Aqui eu vou explicar quais são as minhas configurações e para que servem todas elas.\nNa próxima mensagem voce pode ver as minhas configurações atuais para esse servidor, embora não tenha nenhuma, você pode vizualizar em outro momento usando o comando `/config`.\n\nInicialmente eu tenho alguns comandos setáveis e você pode escolher utilizá-los ou não, caso tenha algum outro bot com a mesma função, não ficarei brava! Segue a lista dos meus comandos de configuração:\n`/setWelcome`: Esse comando define um canal para que eu dê as boas-vindas aos novos membros do servidor. Lembrando, se você já tem um bot com essa função, não precisa digitar esse comando.\n\n`/setLevel`: Esse comando define um canal para que eu anuncie quando um membro sobe de nível. Se não for definido, o meu sistema de nível continuará funcionando furtivamente sem enviar mensagens, pois os XPs ganhos também irão para o meu sistema de nível global.\n\n`/setLog`: Esse comando define um canal para que eu registre o uso dos meus comandos importantes ou comandos que modifiquem o servidor, mais precisamente, comandos de moderação.\n\n✳️`/setLanguage`: Esse comando define a linguagem em que eu vou estar funcionando nesse servidor. Atualmente, eu posso funcionar em três línguas: :flag_br: `Português`, :flag_us: `Inglês`, e :flag_cn: `Chinês`.\n\n**ESCOLHA A LINGUAGEM ABAIXO PARA LER ESSA MENSAGEM NO SEU IDIOMA**.",
    embedTwoTitle: "Configurações Atuais",
    embedTwoDesc: "Nenhuma configuração disponível no momento.",
  },
  cn: {
    embedOneTitle: "这是我的配置教程。",
    embedOneDesc:
      "在这里，我会解释我的设置是什么以及它们的用途。\n在下一条消息中，您可以看到我为此服务器设置的当前配置。尽管目前没有设置，但您可以稍后通过使用命令`/config`来查看。\n\n最初，我有一些可配置的命令，您可以选择是否使用它们。如果您有其他具有相同功能的机器人，我不会生气！以下是我的配置命令列表：\n`/setWelcome`：此命令定义一个频道，在此频道中我会欢迎服务器的新成员。如果您已经有具有此功能的机器人，则无需使用此命令。\n\n`/setLevel`：此命令设置一个频道，当某个成员升级时，我将在此频道中宣布。如果未定义，我的等级系统将继续默默运行，所获得的XP也将计入我的全球等级系统。\n\n`/setLog`：此命令定义一个频道，我将在此记录重要命令的使用或修改服务器的命令，尤其是管理命令。\n\n✳️`/setLanguage`：此命令设置我在此服务器中使用的语言。我目前支持三种语言： :flag_cn: `中文`、:flag_us: `英文` 和 :flag_br: `葡萄牙文`。\n\n**选择下面的语言以阅读此消息的翻译版本**。",
    embedTwoTitle: "当前设置",
    embedTwoDesc: "目前没有可用的设置。",
  },
};

module.exports = { TutorialLang };
