const router = require("express").Router();

const Report = require("../models/Report");
const { userAuth, checkRole } = require("../utils/Auth");
const { SavingReport, serializeReports } = require("../utils/report-service");
//const gridFile = require("../models/gridfile.model");

const upload = require("../utils/upload");
const pdfupload = require("../utils/pdfupload");

//const upload = multer({ dest: "uploads/" });


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
router.get("/get/:id", userAuth, checkRole(["patient"]), async(req, res) => {


    Report.findOne({ User: { _id: req.user._id }, _id: req.params.id })
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




//  to Save the report PDF file from app to existing object 
//kind of update
router.post("/SavePDF", pdfupload.single('file'), async(req, res, next) => {
    let id = req.body.id;

    let updatedreport = {
        reportpdf: req.file.path
    };

    Report.findByIdAndUpdate(id, { $set: updatedreport })
        .then(response => {
            res.json({
                message: "PDF file uploaded successfully"
            });
        })
        .catch(error => {
            res.json({
                message: "Error uploading PDF file"
            });
        });
    // .then(Report => {
    //     if (!Report) {
    //         return res.status(404).send({
    //             message: "User not found with id " + id
    //         });
    //     }
    //     res.send(Report);
    // }).catch(err => {
    //     if (err.kind === 'ObjectId') {
    //         return res.status(404).send({
    //             message: "User not found with id " + id
    //         });
    //     }
    //     return res.status(500).send({
    //         message: "Error updating User with id " + id
    //     });
    // });



});

// download the report PDF file from app to existing object
router.get("/download/:id", async(req, res) => {
    let id = req.params.id;
    let file_path = "./public/uploads/files";
    Report.findOne({ _id: id })
        .then(data => {
            console.log(data.reportpdf);
            res.download(data.reportpdf);
           // res.download(file_name);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            });
        });
});

router.post("/saveimage", upload.single('image'), async(req, res, next) => {

    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        let id = req.body.id;
        console.log(req.file.originalname);
        let updatedreport = {
            reportpdf: req.file.file_name
        };
    
        return res.send({
          success: true
        });
      }
    }
);











//     const id = req.params.id;
//     console.log(id);


//     // Find user and update it with the request body
//     Report.findByIdAndUpdate(id, {,
//         }, { new: true })
//         .then(user => {
//             if (!user) {
//                 return res.status(404).send({
//                     message: "User not found with id " + id
//                 });
//             }
//             res.send(user);
//         }).catch(err => {
//             if (err.kind === 'ObjectId') {
//                 return res.status(404).send({
//                     message: "User not found with id " + id
//                 });
//             }
//             return res.status(500).send({
//                 message: "Error updating User with id " + id
//             });
//         });

//     console.log(req.file);
//     res.send(req.file);

// });



// //UPLOAD FILE API
// router.post('/v1/files', upload.any(), async(req, res, nxt) => {
//     try {
//         // uploaded file are accessible as req.files
//         if (req.files) {
//             const promises = req.files.map(async(file) => {
//                 const fs = require('fs');
//                 const fileStream = fs.createReadStream(file.path);

//                 // upload file to gridfs
//                 const gridFile = new gridfile({ filename: file.originalname });
//                 await gridFile.upload(fileStream);

//                 // delete the file from local folder
//                 fs.unlinkSync(file.path);
//             });

//             await Promise.all(promises);
//         }

//         res.sendStatus(201);
//     } catch (err) {
//         nxt(err);
//     }
// });





module.exports = router;