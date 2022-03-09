const { Schema, model } = require('mongoose');

// const User = require('./User');
// const Schema = mongoose.Schema;

const derm = new Schema({

    User: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    status: {
        type: String,
        enum: ['Online', 'Do Not Disturb', 'Busy', 'Be Right Back', 'Off Work', 'Appear Status']
    }

});

module.exports = model('derm', derm);