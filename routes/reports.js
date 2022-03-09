const router = require("express").Router();

const Report = require("../models/Report");
const { userAuth, checkRole } = require("../utils/Auth");
const { SavingReport, serializeReports } = require("../utils/report-service");


//Reports sends to DB
router.post("/Saved", userAuth, checkRole(["patient"]), async(req, res) => {
    await SavingReport(req.body, req.user, res);
});

//Get all reports of Patient
router.get("/getAll", userAuth, checkRole(["patient"]), async(req, res) => {
    //   serializeReports(req.user);


    Report.find({ User: { _id: req.user._id } })
        .then(data => {
            res.send(data);
            console.log(data.toString());
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });

});

//Get one report of Patient
router.get("/get/:r_id", userAuth, checkRole(["patient"]), async(req, res) => {


    Report.findOne({ User: { _id: req.user._id }, _id: req.params.r_id })
        .then(data => {
            res.send(data);
            console.log(data.toString());
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });

});


module.exports = router;