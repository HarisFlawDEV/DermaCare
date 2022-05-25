const { Schema, model } = require('mongoose');

const ReportReviewSchema = new Schema({

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
        ref: 'users',
        required: true
    }

});


module.exports = model('ReportReview', ReportReviewSchema);