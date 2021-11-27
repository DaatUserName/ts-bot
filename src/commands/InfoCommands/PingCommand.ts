import { Client } from 'discord.js';
import { RunFunc } from '../../interfaces/Command';

export const run: RunFunc = async (client, message) => {
	message.reply('Pong!');
};
export const name: string = 'ping';
