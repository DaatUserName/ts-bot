import { Bot } from '../client/Client';

export interface RunFunc {
	(client: Bot, ...args: any[]): Promise<any>;
}

export interface Event {
	name: String;
	run: RunFunc;
}
