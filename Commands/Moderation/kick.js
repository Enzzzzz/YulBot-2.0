const { ApplicationCommandType, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'kick',
    description: "Kick someone from the server",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
          name: "username",
          type: ApplicationCommandOptionType.User,
          description: "Type the username",
          required: true
        },
        {
            name: "reason",
            type: ApplicationCommandOptionType.String,
            description: "Reason for the kick",
            required: false
        }
    ],
    userPerms: ['KickMembers'],
    botPerms: ['KickMembers'],
    ownerOnly: false,
    run: async (client, interaction) => {
        const user = interaction.options.getUser('username');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        const serverName = interaction.guild.name;
        const serverIcon = interaction.guild.iconURL();

        const member = interaction.guild.members.cache.get(user.id);

        if (!member) {
            const noMember = new EmbedBuilder()
					.setDescription(`This user is not a member of the server.`)
					.setColor('Red')
            return interaction.reply({ embeds: [ noMember ], ephemeral: true });
        }

        if (interaction.user.id === member.id) {
            const yourselfKick = new EmbedBuilder()
					.setDescription(`You cannot kick \`Yourself\`.`)
					.setColor('Red')
            return interaction.reply({ embeds: [yourselfKick], ephemeral: true})
        }

        if (!interaction.member.permissions.has('KickMembers')) {
            const noPerm = new EmbedBuilder()
					.setDescription(`You don't have \`permission\` to use this command.`)
					.setColor('Red')
            return interaction.reply({ embeds: [noPerm], ephemeral: true });
        }

        if (member.permissions.has('Administrator')) {
            const kickAdm = new EmbedBuilder()
					.setDescription(`You cannot kick an \`Administrator\`.`)
					.setColor('Red')
            return interaction.reply({ embeds: [kickAdm], ephemeral: true });
        }

        try {
            await member.kick(reason);

            const kick_embed = new EmbedBuilder()
                .setTitle(`${user.username} has been kicked from the server`)
                .setDescription(`**Reason**: ${reason}`)
                .setColor('#990000')
                .setThumbnail(client.user.displayAvatarURL())
                .addFields(
                    { name: "User:", value: `${user.tag}` },
                    { name: "Action:", value: "Kicked from the server" }
                )
                .setTimestamp();

            const kick_embed_DM = new EmbedBuilder()
                .setTitle(`You has been kicked from ${serverName}`)
                .setDescription(`**Reason**: ${reason}`)
                .setColor('#990000')
                .setThumbnail(serverIcon)
                .addFields(
                    { name: "**User:**", value: `${user.tag}` },
                    { name: "**Action:**", value: "Kicked from the server" },
                    { name: "**Kicked by:**", value: `${interaction.user.tag}`}
                )
                .setTimestamp();

            interaction.reply({ embeds: [kick_embed], ephemeral: true });
            member.send({ embeds: [kick_embed_DM]})
        } catch (error) {
            console.error(error);
            interaction.reply({ content: "I couldn't kick this user. Make sure I have the right permissions.", ephemeral: true });
        }
    }
};
