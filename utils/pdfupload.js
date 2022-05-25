const multer = require('multer');
const path = require('path');
const utility = require("../utils/utilities");


// handle storage using multer
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        //console.log(file.mimetype+ "CAlled"); //Will return something like: image/jpeg
        cb(null, `${file.fieldname}-${utility.randomNumber(5)}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

var fileFilter = function(req, file, cb) {
    var allowedMimes = ['application/pdf'];
    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb({
            success: false,
            message: 'Invalid file type. Only pdf files are allowed.'
        }, false);
    }
};

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
module.exports = upload;