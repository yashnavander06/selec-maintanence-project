const express = require('express')
const routers = express.Router();
const adminControllers = require('../Controllers/admin.controllers')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')

// Get all users
routers.get('/', checkAuth, adminControllers.getUsers)

routers.get('/profile', (req, res) => {
    res.send("admin profile")
})

// Add user
routers.post('/add_user', adminControllers.addUser)

// Update user
routers.put('/update_user/:id', adminControllers.updateUser)

// Delete User

// Add role
routers.post('/add_role', adminControllers.addRole)

// Get all roles
routers.get('/roles', adminControllers.getRoles)

//////////////////////////////////////////////////// Asset Section ///////////////////////////////////////////////////


module.exports = routers;