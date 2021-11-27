import { Config } from './interfaces/Config';
import * as File from '../conifg.json';
import { Bot } from './client/Client';

new Bot().start(File as Config);
