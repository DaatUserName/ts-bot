import { RunFunc } from '../../interfaces/Event';
import { Command } from '../../interfaces/Command';
import { Message } from 'discord.js';
const consola = require('consola');

/**
 * 描述
 * @date 2021-11-27
 * @param {any} client
 * @param {any} message
 * @param {any} args
 * @returns {any}
 * TODO Fix this error message: TypeError: Cannot read properties of undefined (reading 'get')
 */

export const run: RunFunc = async (client, message: Message) => {
	if (message.author.bot || !message.guild || !message.content.startsWith('?'))
		return;

	const args: string[] = message.content.slice('?'.length).trim().split(/ +/g);
	const cmd: string = args.shift();
	const command: Command = client.commands.get(cmd.toLowerCase());
	if (!command) return;
	command.run(client, message, args).catch((reason: any) => {
		consola.error(new Error(`${reason}`));
	});
};

export const name: string = 'messageCreate';
