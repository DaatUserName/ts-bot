import { RunFunc } from '../../interfaces/Command';

export const run: RunFunc = async (client, message, args) => {
	const member = message.mentions.members.first();
	const reason = args.slice(1).join(' ');

	if (reason && member) message.reply('YAY');
};
export const name: string = 'kick';
