const { findUser } = require('../Middleware/checkAuth.middleware')
const upload = require('../Middleware/imageUpload.middleware')
const { imageModel } = require('../Models/checklist.model')
const { Ticket } = require('../Models/ticket.models')
const {Location} = require('../Models/location.model')
var fs = require('fs');
var path = require('path');
const express = require('express');
const pino = require('pino');
const expressPino = require('express-pino-logger');

const logger = pino({level: process.env.LOG_LEVEL || 'info' }  );

// Image Upload
const imageUpload = async (req, res) => {
    try {
        const image = req.file.firebaseUri
        const imagename = req.file.originalname

        const newImage = new imageModel({
            name: imagename,
            image: image
        })

        await newImage.save()

        res.status(200).json({ msg: "image uploaded successfully" })
        logger.info('This is image Upload of Technician')

    } catch (err) {
        logger.debug('There is a error in image upload of Technician')
        res.json({ message: err });
    }

}

//Workorder
const workOrder = async (req, res) => {
    try {
        // pagination parameters
        const { page = 1, limit = 9 } = req.query

        const username = req.valid.username // data retrived from token
        const user = await findUser(username)

        const techniid = user._id.toString()
        const ticketdis = await Ticket.find({ accepted_by: techniid }).limit(limit * 1).skip((page - 1) * limit).exec()

        return res.status(200).send({ tickets: ticketdis, totalcount: ticketdis.length }),
        logger.info('This is work order of Technician')

    } catch (error) {
        logger.debug('There is a error in work order of Technician')
        return res.status(500).json({ error: error })
    }
}

//Ticket display - display all tickets 
const ticketDisplay = async (req, res) => {
    try {
        // pagination parameters
        const { page = 1, limit = 9 } = req.query

        const username = req.valid.username // data retrived from token
        const user = await findUser(username)

        const userskills = user.skills

        let filteredTicketsList = []
        for (let i in userskills) {
            let userskill = userskills[i].toString()
            const filteredTicket = await Ticket.find({ asset_name: userskill, accepted_by: null, accepted: false, ticket_type: 'trouble' }).populate('asset_name', 'asset_name').limit(limit * 1).skip((page - 1) * limit).exec()
            if (typeof filteredTicket !== 'undefined') {
                /**
                 * we used spread operator (...) to push everything inside filteredTicket list to filteredTicketsList list
                    without the spread operator we will only get the first data/object of the list 
                 */

                filteredTicketsList.push(...filteredTicket)
            }
        }

        const info = []
        for (let i in filteredTicketsList) {
            if (typeof filteredTicketsList[i] !== 'undefined') {

                let displayTicket = {
                    _id: filteredTicketsList[i]._id,
                    subject: filteredTicketsList[i].subject,
                    asset_name: filteredTicketsList[i].asset_name,
                    description: filteredTicketsList[i].description,
                    status: filteredTicketsList[i].status,
                    openat: filteredTicketsList[i].open_at,
                    location: filteredTicketsList[i].location,
                }

                info.push(displayTicket)
            }
        }

        return res.status(200).send({
            tickets: info,
            totalcount: info.length
        }),
        logger.info('This is ticket display of Technician')
    } catch (error) {
        logger.debug('There is a error in ticket display of Technician')
        return res.status(500).json({ error: error })
    }
}

//Ticket accept
const ticketAccept = async (req, res) => {

    try {
        const username = req.valid.username // data retrived from token
        const user = await findUser(username)
        const userid = user._id
        await Ticket.findOneAndUpdate({ _id: req.params.ticketid }, {
            $set: {
                "accepted": "true",
                "accepted_by": userid
            }
        }, { new: true })

        return res.status(200).send({ msg: "The Ticket has been accepted" }),
        logger.info('This is ticket Accept of Technician')
    } catch (error) {
        logger.debug('There is a error in ticket Accept of Technician')
        return res.status(500).json({ error: error })
    }
}

const getLocation = async (req, res) => {
    try {
        
        // send only floor and rooms data of specific building
        if(req.query.building_no){
            const floorandrooms = await Location.find({unit_or_building: req.query.building_no}).select('subdivision').populate('subdivision.rooms.assets', 'model_name')
            return res.status(200).json({floorandrooms: floorandrooms})
        }

        // send only building names
        const buildings = await Location.find({}).select('unit_or_building')
        return res.status(200).json({buildings: buildings}),
        logger.info('This is get location of Admin')

        
    } catch (error) {
        logger.debug('There is a error in Get Location of Technician')
        return new Error({error:error})
    }
}

module.exports = { workOrder, ticketAccept, ticketDisplay, imageUpload, getLocation }