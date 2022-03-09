const { Schema, model } = require('mongoose');


const ReportSchema = new Schema({

    confidencelvl: {
        type: Number
    },

    Disease: {
        type: String
    },

    //for patients
    User: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
});


module.exports = model('Report', ReportSchema);