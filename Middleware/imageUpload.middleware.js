const multer = require('multer')

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Uploads')},
    filename: (req, filename, cb) => {
        cb(null, file.orginalname);
    }
})

const upload = multer({
    limits: {
        fileSize: 2000000
    },
    // storage: imageStorage,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg|PNG|JPG|JPEG)$/)) return cb(new Error("invalid file format"))

        cb(null,true)
    }
});

module.exports = { upload }