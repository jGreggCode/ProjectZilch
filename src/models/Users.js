const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    guildId: {
        type: String,
        require: true
    },
    balance: {
        type: Number,
        default: 0
    },
    lastDaily: {
        type: Date,
        require: true
    }
})

module.exports = model('User', userSchema);