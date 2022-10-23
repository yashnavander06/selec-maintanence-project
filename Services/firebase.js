var admin = require("firebase-admin");

// import json file provided by firebase admin storage
var serviceAccount = require("../Config/selec-maintainence-project-firebase-adminsdk-bmf25-019508a054.json");

// location of firebase project
const BUCKET = 'selec-maintainence-project.appspot.com'

// initialize the application using firebase admin 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

// initialze firebase admin bucket storeage where images will be stored
const bucket = admin.storage().bucket();

const uploadImage = (req,res,next)=>{

    if(!req.file) return new Error({errror: "file not selected"})

    // first we will fetch the image and rename the image name with current date-time and original imagename
    const image = req.file
    const imageName = Date.now() + '.' + image.originalname.split('.').pop()

    // store the image in firebase bucket
    const file = bucket.file(imageName)

    // create a new write stream and write the image with content type mimetype
    const stream = file.createWriteStream({
        metadata:{
            contentType: image.mimetype,
        }
    })

    stream.on('error', (e) => {
        console.error(e)
    })

    // after finishing the steraming procss make the file public and create firebase url by embedding the BUCKET location and image name in the url
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