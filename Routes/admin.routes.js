const express = require('express')
const routers = express.Router();
const adminControllers = require('../Controllers/admin.controllers')
const config = require('../config.json')
const { checkAuth, checkRole } = require('../Middleware/checkAuth.middleware')

//////////////////////////////////////////////////// User Section ///////////////////////////////////////////////////

// Get one/all user/s
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

// Get all assets
routers.get('/assets', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.getAsset)

// Add asset
routers.post('/add_assets', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.addAsset)

// Delete asset
routers.delete('/delete_asset/:id', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.deleteAsset)

//////////////////////////////////////////////////// Asset Category Section //////////////////////////////////////////

// Add asset category
routers.post('/add_assetCategory', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.addAssetCategory)

// get all asset category
routers.get('/assetCategory', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.getAssetCategory)

// update asset category
routers.put('/update_assetCategory/:id', adminControllers.updateAssetCategory)

// delete asset category
routers.delete('/delete_assetCategory/:id', checkAuth, checkRole(config.ROLE.ADMIN), adminControllers.deleteAssetCategory)

//////////////////////////////////////////////////// Machinary Section ///////////////////////////////////////////////

// get all machinedata
routers.get('/machineData')

// add machinedata
routers.post("/add_machineData")

// delete machinedata
routers.delete("/delete_machineData/:id")

// update machinedata
routers.put('/update_machineData/:id')

//////////////////////////////////////////////////// Schedular Section ///////////////////////////////////////////////

module.exports = routers;