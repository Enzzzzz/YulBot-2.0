const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    guildID: {
        type: String,
        required: true,
    },
    guildName: {
        type: String,
        required: true
    },
    welcomeChannelID: {
        type: String,
        default: null
    },
    memberCountChannelID: {
        type: String,
        default: null
    },
    language: {
        type: String,
        default: "en"
    },
    logChannelID: {
        type: String,
        default: null
    },
    levelChannelID: {
        type: String,
        default: null
    },
    autoChannels: {
        type: [String],
        default: []
    }
});

module.exports = mongoose.model('guild', guildSchema);
