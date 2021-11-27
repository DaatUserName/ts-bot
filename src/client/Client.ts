import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
import {
	Client,
	MessageEmbedOptions,
	Message,
	MessageEmbed,
	Intents,
	Collection,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import { Config } from '../interfaces/Config';

const globPromise = promisify(glob);

class Bot extends Client {
	public commands: Collection<string, Command> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public config: Config;
	public constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_MESSAGE_TYPING,
				Intents.FLAGS.GUILDS,
			],
		});
	}
	public async start(config: Config): Promise<void> {
		this.config = config;
		this.login(config.token);
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.ts,.js} `
		);
		commandFiles.map(async (value: string) => {
			const file: Command = await import(value);
			this.commands.set(file.name, file);
		});
		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.ts,.js} `
		);
		eventFiles.map(async (value: string) => {
			const file: Event = await import(value);
			this.events.set(file.name, file);
			this.on(file.name, file.run.bind(null, file));
		});
	}

	public embed(options: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({ ...options, color: 'RANDOM' }).setFooter(
			`${message.author.tag}`,
			message.author.displayAvatarURL({ format: 'png', dynamic: true })
		);
	}
}

export { Bot };
