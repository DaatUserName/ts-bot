const mongoose = require('mongoose');
const consola = require('consola');
const config = require('../../conifg.json');

mongoose.connect(
	config.db,
	{
		useCreateIndex: true,
		useNewUrlPaser: true,
		useUnifiedTopology: true,
	},
	() => {
		consola.success('Connected to database...');
	}
);
