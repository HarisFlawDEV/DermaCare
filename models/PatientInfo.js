const mongoose = require('mongoose');

// const User = require('./User');
// const Schema = mongoose.Schema;

const patient = new mongoose.Schema({

    User: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
});

module.exports = mongoose.model('patient', patient);