const mongoose = require('mongoose');


const ReportReview = new mongoose.Schema({

    Report: {
        type: Schema.Types.ObjectId,
        ref: 'Report',
        required: true
    },

    Comment: {
        type: String
    },

    Rating: {
        type: Number
    },

    Suggestion: {
        type: String
    },

    User: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});


module.exports = mongoose.model('ReportReview', ReportReview);