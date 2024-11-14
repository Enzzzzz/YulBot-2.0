const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
      },
      userName: {
        type: String,
        required: true
      },
      global: {
        messagesSent: {
          type: Number,
          default: 0
        },
        xp: {
          type: Number,
          default: 0
        },
        level: {
          type: Number,
          default: 0
        }
      },
      guilds: [
        {
          guildId: {
            type: String,
            required: true
          },
          guildName: {
            type: String,
            required: true
          },
          messagesSent: {
            type: Number,
            default: 0
          },
          xp: {
            type: Number,
            default: 0
          },
          level: {
            type: Number,
            default: 0
          },
          title: {
            type: String,
            default: ""
          }
        }
      ],
      igns: [
        {
          game: {
            type: String,
            default: ""
          },
          nick: {
            type: String,
            default: ""
          }
        }
      ]
    });

module.exports = mongoose.model('user', userSchema);
