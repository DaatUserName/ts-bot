import { Bot } from '../client/Client';
import { Message } from 'discord.js';

export interface RunFunc {
	(client: Bot, message: Message, args: string[]): Promise<Message>;
}

export interface Command {
	name: String;
	category: String;
	run: RunFunc;
}
