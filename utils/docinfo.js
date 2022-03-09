const DoctorInfo = require("../models/DoctorInfo");


const setDoctorInfo = async(obj, user, res) => {





    // const id = user._id;

    // // Validate Request
    // if (!obj) {
    //     return res.status(400).send({
    //         message: "Body content can not be empty"
    //     });
    // }



    // // Find user and update it with the request body
    // User.findByIdAndUpdate(id, {

    //         firstName: obj.firstName,
    //         lastName: obj.lastName,
    //         phone: obj.phone,
    //         gender: obj.gender,
    //         dob: obj.dob,
    //         image: obj.image,
    //     }, { new: true })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(404).send({
    //                 message: "User not found with id " + id
    //             });
    //         }
    //         res.send(user);
    //     }).catch(err => {
    //         if (err.kind === 'ObjectId') {
    //             return res.status(404).send({
    //                 message: "User not found with id " + id
    //             });
    //         }
    //         return res.status(500).send({
    //             message: "Error updating User with id " + id
    //         });
    //     });
};

//module.exports = setDoctorInfo ;