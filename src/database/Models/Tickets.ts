import mongoose from 'mongoose';
var autoIncrement = require('mongoose-auto-increment');

const TicketConfig = new mongoose.Schema({
	guildid: {
		type: String,
		required: true,
	},
	messageid: {
		type: String,
		required: true,
	},
	userid: {
		type: String,
		required: true,
	},
	modid: {
		type: String,
		required: true,
	},
});

autoIncrement.initialize(mongoose.connection);
TicketConfig.plugin(autoIncrement.plugin, 'caseid');

const ticket = mongoose.model('Support tickets', TicketConfig);

export { ticket };
