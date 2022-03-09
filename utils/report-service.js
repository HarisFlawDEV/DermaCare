const Report = require("../models/Report");
/**
 * @DESC To save the report from app
 */
const SavingReport = async(reportobj, user, res) => {

    // Validate request
    if (!reportobj) {
        return res.status(400).send({
            message: "Report can not be empty"
        });
    }

    // Create a Report
    const report = new Report({
        confidencelvl: reportobj.confidencelvl,
        Disease: reportobj.disease,
        User: user
    });

    // Save Report in the database
    //await
    report.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Report."
            });
        });
};


/**
 * @DESC Get All Reports
 */
const serializeReports = user => {

    // Report.find({ User: { _id: user._id } })
    //     .then(data => {
    //         return data.json;
    //     })
    //     .catch(err => {
    //         return err.message || "Some error occured";
    //     });


};

module.exports = { SavingReport, serializeReports };