// const path = require("path");
// const multer = require("multer");

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, "./uploads");
//     },
//     filename: function(req, file, cb) {
//         print(file.originalname);
//         console.log(file.originalname);
//         let ext = path.extname(file.originalname);
//         cb(null, file.filename + ".pdf");
//     }
// });

// var upload = multer({
//     storage: storage,
//     fileFilter: function(req, file, callback) {
//         if (
//             file.mimetype == "image/png" ||
//             file.mimetype == "image/jpg" ||
//             file.mimetype == "pdf"
//         ) {
//             callback(null, true);
//         } else {
//             console.log("only jpg and png are allowed");
//             callback(null, false);
//         }
//     },
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     }
// });


const multer = require('multer');
const path = require('path');

// Set The Storage Engine
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Init Upload
const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
});

// Check File Type
function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

module.exports = upload;