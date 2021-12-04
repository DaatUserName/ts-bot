import { RunFunc } from '../../interfaces/Command';
import { modschem } from '../../database/Models/modSchema';
import { MessageEmbed } from 'discord.js';

export const run: RunFunc = async (client, message, args) => {
	const member = message.mentions.members.first();
	const reason = args.slice(1).join(' ');

	if (!reason && !member)
		return message.reply(`You didn't provide a any of the required arguments!`);

	const data = new modschem({
		userid: member.id,
		guildid: message.guild.id,
		modid: message.author.id,
		reason: reason,
		type: 'kick',
	});

	data.save();

	member.kick(reason);
	const embed = new MessageEmbed()
		.setColor('BLURPLE')
		.setTitle(`**Moderation: ban [Case ID: ${data._id}$]`)
		.addFields(
			{ name: 'Member', value: `${member}`, inline: true },
			{ name: 'Moderator', value: `${message.author.tag}`, inline: true },
			{ name: 'Reason', value: `${reason}`, inline: true },
			{ name: 'Duration', value: 'Permanently', inline: false }
		)
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true }));
	return message.channel.send({ embeds: [embed] });
};
export const name: string = 'kick';
