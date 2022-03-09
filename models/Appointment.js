const mongoose = require('mongoose');


const Appointment = new mongoose.Schema({

    DoctorUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },

    PatientUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }

});

module.exports = mongoose.model('Appointment', Appointment);