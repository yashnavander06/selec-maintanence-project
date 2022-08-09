const multer = require('multer')

const imageStorage = multer.diskStorage({
    destination: 'Uploads',
    filename: (req, filename, cb) => {
        cb(null, file.orginalname);
    }
})

const upload = multer({
    storage: imageStorage
}).single('images');

module.exports = { upload }