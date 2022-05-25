const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");


// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the application
const app = exp();

// Middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

require("./middlewares/passport")(passport);


// // init gfs
// let gfs;
// conn.once("open", () => {
//     // init stream
//     gfs = new mongoose.mongo.GridFSBucket(conn.db, {
//         bucketName: "uploads"
//     });
// });

// // Storage
// const storage = new GridFsStorage({
//     url: mongoURI,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString("hex") + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: "uploads"
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({
//     storage
// });



// User Router Middleware
app.use("/api/users", require("./routes/users"));
app.use("/api/reports", require("./routes/reports"));
app.use("/api/doctors", require("./routes/doctor"));
app.use("/api/review", require("./routes/review"));



const startApp = async() => {
    try {
        // Connection With DB
        await connect(DB, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });

        success({
            message: "Successfully connected with the Database \n" + DB,
            badge: true
        });

        // Start Listenting for the server on PORT
        app.listen(process.env.PORT || PORT, () =>
            success({ message: "Server started on PORT " + PORT, badge: true })
        );
    } catch (err) {
        error({
            message: "Unable to connect with Database \n" + err,
            badge: true
        });
        startApp();
    }
};

startApp();