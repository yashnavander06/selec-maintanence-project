const upload = require('../Middleware/imageUpload.middleware')
const { findUser } = require('../Middleware/checkAuth.middleware')
const { imageModel } = require("../Models/checklist.model")
const { User, Role } = require('../Models/users.model')
const upload = require("../Middleware/imageUpload.middleware");
const { Ticket } = require("../Models/ticket.models");


// const imageUpload = async(req, res) => {
//     upload(req, res, (err) => {
//         if (err) console.log(err)

//         const newImage = new imageModel({
//             name: req.body.name,
//             image: {
//                 data: req.file.filename,
//                 contentType: ['image/png', 'image/jpg', 'image/jpeg']
//             }
//         })
//         try {
//             await newImage.save()

//         } catch (err) {
//             res.json({ message: error });
//         }
//     })
// }

//Workorder
const workOrder = async(req, res) => {
    try {
        //checking if the role is technician
        const username = req.valid.username // data retrived from token
        const user = await findUser(username)

        const userid = user._id
        const roles = await Role.find({
            _id: user.role
        })
        const techniid = user._id.toString()
        const ticketdis = await Ticket.find({})

        let techid = []
        for (let i in ticketdis) {
            techid.push(ticketdis[i].accepted_by)
        }
        const filterticket = []

        for (let i in techid) {

            if (techniid.includes(techid[i])) {
                filterticket.push(ticketdis[i])
            }

        }

        return res.status(200).send({ ticket: filterticket, totalcount: filterticket.length })

    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

//ticket display

const ticketDisplay = async(req, res) => {
        try {
            const username = req.valid.username // data retrived from token
            const user = await findUser(username)

            const userid = user._id
            const roles = await Role.find({
                _id: user.role
            })


            const skill = user.skills.toString()
            const ticketdis = await Ticket.find({})

            let assetid = []
            for (let i in ticketdis) {

                assetid.push(ticketdis[i].asset_name)
            }

            const info = []
            for (let i in assetid) {


                if (skill.includes(assetid[i]))

                {
                    dic = {
                        subject: ticketdis[i].subject,
                        assetid: ticketdis[i].asset_name,
                        description: ticketdis[i].description,
                        status: ticketdis[i].status,
                        openat: ticketdis[i].open_at,
                        location: ticketdis[i].location,
                        _id: ticketdis[i]._id
                    }

                    info.push(dic)
                }

            }

            return res.status(200).send({
                tickets: info,
                totalcount: info.length
            })
        } catch (error) {
            return res.status(500).json({ msg: error })
        }
    }
    //ticket accept
const ticketAccept = async(req, res) => {

    try {
        const username = req.valid.username // data retrived from token
        const user = await findUser(username)
        console.log(user)
        const userid = user._id
        const accept = await Ticket.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: {
                "accepted": "true",
                "accepted_by": userid
            }
        }, { new: true })

        return res.status(200).send("accepted")
    } catch (error) {
        return res.status(500).json({ msg: error })
    }
}

module.exports = { workOrder, ticketAccept, ticketDisplay }