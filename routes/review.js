const router = require("express").Router();

const Report = require("../models/Report");
const DoctorInfo = require("../models/DoctorInfo");
const User = require("../models/User");
const ReportReview = require("../models/ReportReview");


//when user select the doctor by id to review the report
// it will trigger to generate the review object 
// and show 
// id of the report is sent to the backend
// id of the doctor is sent to the backend

router.post("/", async(req, res) => {

    // let report_id = req.body.report_id;
    // let doctor_id = req.body.doctor_id;
    // let report;
    // let doctor;

    // Report.findOne({ Report, _id: report_id })
    //     .then(data => {
    //         report = data;
    //         //  res.send(data);
    //         console.log(data.toString());
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occured"
    //         });
    //     });


    // User.findOne({ User, _id: doctor_id })
    //     .then(data => {
    //         doctor = data;
    //         // res.send(data);
    //         console.log(data.toString());
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: err.message || "Some error occured"
    //         });
    //     });



    let reportReview = new ReportReview({
        Report: req.body.report_id,
        User: req.body.doctor_id
    });

    await reportReview.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Report."
            });
        });
    //    res.send(reportReview);



    //         .findOne({ User: { _id: req.user._id }, _id: req.params.id })
    // .then(data => {
    //     res.send(data);
    //     console.log(data.toString());
    // })
    // .catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occured"
    //     });
    // });





});


//when doctor gives review to user
router.post("/doctorreview", async(req, res) => {

    let review_id = req.body.review_id;

    let updatedreview = {
        Comment: req.body.comment,
        Rating: req.body.rating,
        Suggestion: req.body.suggestion
    };

    ReportReview.findByIdAndUpdate(review_id, { $set: updatedreview })
        .then(response => {
            res.json({
                message: "Doctor Review Sent Successfully"
            });
        })
        .catch(error => {
            res.json({
                message: "Error Sending Doctor Review"
            });
        });
});







// });







//in each chat of doctor ,there will be report send to them
// get - report 
// get - report review if available

router.get("/:id", async(req, res) => {});






module.exports = router;