
var admin = require("firebase-admin");

var serviceAccount = require("../Config/selec-maintainence-project-firebase-adminsdk-bmf25-019508a054.json");

const BUCKET = 'selec-maintainence-project.appspot.com'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket();

const uploadImage = (req,res,next)=>{

    if(!req.file) return new Error({errror: "file not selected"})

    const image = req.file
    const imageName = Date.now() + '.' + image.originalname.split('.').pop()

    const file = bucket.file(imageName)

    const stream = file.createWriteStream({
        metadata:{
            contentType: image.mimetype,
        }
    })

    stream.on('error', (e) => {
        console.error(e)
    })

    stream.on('finish', async() => {
        // make the file public
        await file.makePublic()

        // get the public url
        req.file.firebaseUri = `https://storage.googleapis.com/${BUCKET}/${imageName}`
        req.file.originalname = imageName

        next()
    })

    stream.end(image.buffer)
}

module.exports = {uploadImage}