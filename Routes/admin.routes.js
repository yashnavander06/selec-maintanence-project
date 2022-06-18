const express = require('express')
const routers = express.Router();
const adminModel = require('../Models/admin.model')

routers.get('/', (req, res) => {
    res.send("admin page")
})

routers.get('/profile', (req, res) => {
    res.send("admin profile")
})

routers.post('/', async(req, res) => {
    const admindata = new adminModel({
        fname: req.body.fname,
        lname: req.body.lname
    })
    try {
        const Adata = await admindata.save();
        res.json(Adata);
    } catch (error) {
        res.json({ message: error });
    }

})


module.exports = routers;