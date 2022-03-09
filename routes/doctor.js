const router = require("express").Router();

const DoctorInfo = require("../models/DoctorInfo");
const { userAuth, checkRole } = require("../utils/Auth");
const setDoctorInfo = require("../utils/docinfo");


//Get Available Doctors
router.get("/available", userAuth, checkRole(["derm"]), async(req, res) => {
    return res.json(serializeUser(req.user));
});

//Change Status
router.post("/status", userAuth, checkRole(["derm"]), async(req, res) => {
    //  await setDoctorInfo(req.body, req.user, res);

    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Doctor can not be empty"
        });
    }

    // Create a Report
    const doc = new DoctorInfo({
        status: req.body.status,
        User: req.user
    });

    // Save doctor in the database
    //await
    doc.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Report."
            });
        });



});


module.exports = router;