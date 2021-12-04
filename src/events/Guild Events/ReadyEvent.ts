import { RunFunc } from '../../interfaces/Event';
import { Client } from 'discord.js';
const consola = require('consola');

export const run: RunFunc = async (client) => {
	consola.success('logged in');
};
export const name: string = 'ready';
