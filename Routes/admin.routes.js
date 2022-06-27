const express = require('express')
const routers = express.Router();
const adminControllers = require('../Controllers/admin.controllers')
const config = require('../config.json')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')

//////////////////////////////////////////////////// User Section ////////////////////////////////////////////////////

// Get all users
routers.get('/', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.getUsers)

// Add user
routers.post('/add_user', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.addUser)

// Update user
routers.put('/update_user/:id', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.updateUser)

// Delete User
routers.delete('/delete_user/:id', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.deleteUser)

//////////////////////////////////////////////////// Role Section ////////////////////////////////////////////////////

// Add role
routers.post('/add_role', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.addRole)

// Get all roles
routers.get('/roles', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.getRoles)

// Delete role
routers.delete('/delete_role/:id', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.deleteRole)

//////////////////////////////////////////////////// Asset Section ///////////////////////////////////////////////////


module.exports = routers;