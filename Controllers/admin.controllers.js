const { User, Role } = require('../Models/users.model')
const { Asset, assetsconfig } = require('../Models/assets.model')
const { machinedata } = require('../Models/machinedata.model')
const { Location } = require('../Models/location.model')
const { Schedular } = require('../Models/schedular.model')

const bcrypt = require('bcrypt');

//////////////////////////////////////////////////// User Section ////////////////////////////////////////////////////

// get all users
const getUsers = async(req, res, next) => {
    try {
        let keys = req.query.user_id
        if (keys) {
            const user = await User.findOne({ user_id: keys })
            if (user === null) return res.status(404).json({ msg: "No user Found" })
            return res.send(user)
        }
        let role = req.query.role
        if (role) {
            const userrole = await User.find({ "role.name": { $regex: role } })
            const total = userrole.length;
            if (userrole === null) return res.status(404).json({ msg: `No user with role: ${role} was found` })
            return res.status(200).send({ users: userrole, total: total })
        }

        const users = await User.find({}).populate('role',["_id","name"]);
        const total = await User.count({});
        if (users.length == 0) return res.status(404).json({ msg: "No users Found" })

        return res.send({ users: users, total: total })

    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

//  add new user
const addUser = async(req, res) => {
    try {
        const newUser = new User(req.body)
        const saltRounds = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, saltRounds)

        const Userdata = await newUser.save();
        res.json(Userdata);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// Update user
const updateUser = async(req, res) => {
    try {
        // TODO rework on update assetlist and assetcategory
        if(req.body !== null){

            if (req.body.role) {
                req.body.role = await Role.find({name: req.body.role})
                req.body.role = req.body.role[0]
            }
    
            const updateuser = await User.findOneAndUpdate({ _id: req.params.id }, 
                // TODO check conviction for updating the data (i.e $push or $set)
                { $set: {
                    "username": req.body.username,
                    "password": req.body.password,
                    "first_name": req.body.first_name,
                    "middle_name": req.body.middle_name,
                    "last_name": req.body.last_name,
                    "mobile_phone": req.body.mobile_phone,
                    "email_id": req.body.email_id,
                    "company_name": req.body.company_name,
                    "role": req.body.role,
                    "note": req.body.note,
                    "interfaces": req.body.interfaces,
                    "asset_category": req.body.asset_category === null ? null : req.body.asset_category,
                    "asset_list": req.body.asset_list === null ? null : req.body.asset_list
                }},
                { new: true })
            console.log(updateuser)
            const up = await updateuser.save();
            res.json(up);
    
        }
        return new Error({error: "update fields cannot be empty"})

        
    } catch (error) {
        return new Error(error.message)

    }

}

// Delete user
const deleteUser = async(req, res) => {
    try {
        // await User.deleteOne({_id:req.params.id})
        await User.findByIdAndDelete({ "_id": req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).json({ "message": "user deleted successfully" })
            }
            if (err) {
                return res.status(403).json(err)
            }
            return res.status(403).json({ "message": "user not found" })
        })


    } catch (error) {
        return new Error(error)
    }
}

//////////////////////////////////////////////////// Role Section ////////////////////////////////////////////////////

// add new role
const addRole = async(req, res) => {
    const newRole = new Role(req.body)
    try {
        const Roledata = await newRole.save();
        res.json(Roledata);
    } catch (error) {
        res.json({ message: error.message });
    }
}

// get all roles
const getRoles = async(req, res) => {
    const roles = await Role.find({})
    try {
        if (roles.length == 0) return res.status(404).json({ msg: "No roles Found" })

        return res.status(200).json(roles);
    } catch (error) {
        res.json({ message: error });
    }
}

// delete role
const deleteRole = async(req, res) => {
    try {
        await Role.findByIdAndDelete({ "_id": req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).json({ "message": "role deleted successfully" })
            }
            if (err) {
                return res.status(403).json(err)
            }
            return res.status(404).json({ "message": "role not found" })
        })

    } catch (error) {
        return new Error(error)
    }
}

//////////////////////////////////////////////////// Asset Section ///////////////////////////////////////////////////

// get one/all asset/s
const getAsset = async(req, res) => {
    try {

        const getassets = await Asset.find({})
        if (getassets.length == 0) return res.status(404).json({ msg: "No assets Found" })

        return res.json(getassets)
    } catch (error) {
        console.log(error)
        res.json({ message: error.message });
    }
}

// add asset
const addAsset = async(req, res) => {
    try {
        const newAasset = new Asset(req.body)
        const assetData = await newAasset.save();
        res.status(201).json(assetData);

    } catch (error) {
        res.json({ message: error.message });
    }
}

// delete asset
const deleteAsset = async(req, res) => {
    try {
        await Asset.findByIdAndDelete({ "_id": req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).json({ "message": "asset deleted successfully" })
            }
            if (err) {
                return res.status(403).json(err)
            }
            return res.status(404).json({ "message": "asset not found" })
        })
    } catch (error) {
        return new Error(error)
    }
}

//////////////////////////////////////////////////// Asset Category Section //////////////////////////////////////////

// add asset category
const addAssetCategory = async(req, res) => {
    try {
        const addassetcategory = new assetsconfig(req.body)
        const assetcategorydata = await addassetcategory.save()
        res.status(201).json(assetcategorydata)
    } catch (error) {
        res.json({ message: error.message });
    }
}

// get asset category
const getAssetCategory = async(req, res) => {
    try {
        const keys = req.query.asset_id
        if (keys) {
            const assetdata = await assetsconfig.findOne({ asset_id: keys })
            if (assetdata === null) return res.status(404).json({ msg: "No category Found" })
            return res.send(assetdata)
        }
        const getassetcategory = await assetsconfig.find({})
        if (getassetcategory.length == 0) return res.status(404).json({ msg: "assetcategory not found" })

        res.status(200).json(getassetcategory)
    } catch (error) {
        return new Error(error)
    }
}

// update asset category
const updateAssetCategory = async(req, res) => {
    //TODO rework on update logic
    try {
        let udata = []
        let data = req.body.asset_list
        console.log(data.length)
        if (req.body) {
            // TODO add data check condition for already existing asset in asset category
            if (data.length > 1) {
                for (let i in data) {
                    console.log(data[i])
                    const updateasset = await Asset.find({ asset_name: data[i] })
                    udata.push(updateasset[0]) 
                }
                req.body.asset_list = udata
                console.log(req.body.asset_list)
            } else {
                const updateasset = await Asset.find({ asset_name: req.body.asset_list })
                req.body.asset_list = updateasset[0]
                console.log(req.body.asset_list)

            }

        } 
        const updateassetcategory = await assetsconfig.findOneAndUpdate({ _id: req.params.id }, 
            { $push: {
                "asset_category": req.body.asset_category,
                "asset_list": req.body.asset_list
            } }, 
            { new: true })
        console.log(updateassetcategory)
        const uac = await updateassetcategory.save();
        res.status(200).json(uac)
    } catch (error) {
        return new Error(error)
    }
}

// delete asset category
const deleteAssetCategory = async(req, res) => {
    try {
        await assetsconfig.findByIdAndDelete({ '_id': req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).json({ msg: "asset category deleted successfully" })
            }
            if (err) {
                return res.status(403).json(err)
            }
            return res.status(404).json(" asset category not found")
        })
    } catch (error) {
        return new Error(error)
    }
}

///////////////////////////////////////////////////// Machinary Section ////////////////////////////////////////////////

// add machine
const addMachine = async(req, res) => {
    try {
        const newmachine = new machinedata(req.body)
        const Nmachinedata = await newmachine.save()
        res.status(201).json(Nmachinedata)
    } catch (error) {
        return new Error(error)
    }
}

// get machine
const getMachine = async(req, res) => {
    try {
        const mdata = await machinedata.find({})
        const totalcount = await machinedata.count({})
        if (mdata.length === 0) return res.status(404).json({ message: "No machines found" })

        return res.status(200).json({ machines: mdata, total: totalcount })
    } catch (error) {
        return new Error(error)
    }
}

// delete machine
const deleteMachine = async(req, res) => {
    try {
        await machinedata.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).json({ message: "machine deleted successfully" })
            }
            if (err) {
                return new Error(err)
            }
            res.status(404).json({ message: "machine not found" })
        })
    } catch (error) {
        return new Error(error)
    }
}

// update machine
const updateMachine = async(req, res) => {
    try {
        if (req.params.id) {
            const machineupdate = await machinedata.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            const Mdata = await machineupdate.save()
            res.status(200).json({ data: Mdata })
        }
        res.json({ message: "machineid is required" })
    } catch (error) {
        return new Error(error)
    }
}

//////////////////////////////////////////////////// Schedular Section ///////////////////////////////////////////////

// get schedular
const getSchedular = async(req, res) => {
    try {
        const schedular = await Schedular.find({});
        const total = schedular.length;

        if (total == 0) return res.status(404).json({ msg: "no schedules found" })

        res.status(200).json({ Schedules: schedular, total: total })
    } catch (error) {
        return new Error(error)
    }
}

// add schedular
const addSchedular = async(req, res) => {
    try {
        const newSchedule = new Schedular(req.body)
        const schedulardata = await newSchedule.save()
        res.status(200).json({ msg: "data saved successfully" })
    } catch (error) {
        return new Error(error)
    }
}

// update schedular
const updateSchedular = async(req, res) => {
    TODO // add update schedular logic here
}

// delete schedular

const deleteSchedular = async(req, res) => {
    try {
        await Schedular.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
            if (err) return new Error(err)
            if (result) return res.status(200).json({ msg: "schedular deleted successfully" })
        })
        return res.status(404).json({ msg: "schedular not found" })
    } catch (error) {
        return new Error(error)
    }
}

//////////////////////////////////////////////////// Location Section ///////////////////////////////////////////////

// add location
const addLocation = async(req, res) => {
    try {
        const newLocation = new Location(req.body)
        const locationdata = await newLocation.save()
        res.status(201).json({ "new Location": locationdata })
    } catch (error) {
        return new Error(error)
    }
}

// get location
const getLocation = async(req, res) => {
    try {
        if (req.query) {
            let status = req.query.status
            let city = req.query.city
            console.log(status, city)

            if (status && city) {
                const getlocationbystatusandcity = await Location.find({ status: { $regex: status }, city: { $regex: city } })
                const gettotalcount = getlocationbystatusandcity.length
                return res.status(200).json({ locations: getlocationbystatusandcity, total: gettotalcount }).end()
            }
            if (status) {
                const getlocationbystatus = await Location.find({ status: { $regex: status } })
                const totalstatuscount = getlocationbystatus.length
                return res.status(200).json({ status: getlocationbystatus, total: totalstatuscount }).end()
            }
            if (city) {
                const getlocationbycity = await Location.find({ city: { $regex: city } })
                const totalcitycount = getlocationbycity.length
                return res.status(200).json({ cities: getlocationbycity, total: totalcitycount }).end()
            }
        }

        const getlocations = await Location.find({})
        const totalcount = await Location.count({})
        if (totalcount === 0) return res.status(404).json({ message: "no locations found" })
        res.status(200).json({ locations: getlocations, total: totalcount })
    } catch (error) {

    }
}

// update location
const updateLocation = async(req, res) => {
    try {
        if (req.params.id) {
            const updatelocation = await Location.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            console.log(updatelocation)
            const updatedata = await updatelocation.save()
            res.status(200).json({ data: updatedata })
        }
        res.json({ message: "userid is required" })


    } catch (error) {
        return new Error(error)
    }
}

// delete location
const deleteLocation = async(req, res) => {
    try {
        await Location.findByIdAndDelete({ _id: req.params.id }, (err, result) => {
            if (result) {
                return res.status(200).json({ message: "location deleted successfully" })
            }
            if (err) {
                return new Error(err)
            }
            res.status(404).json({ message: "location not found" })
        })
    } catch (error) {
        return new Error(error)
    }
}

module.exports = { getUsers, addUser, updateUser, deleteUser, addRole, getRoles, deleteRole, getAsset, addAsset, deleteAsset, addAssetCategory, getAssetCategory, deleteAssetCategory, updateAssetCategory, addMachine, getMachine, deleteMachine, updateMachine, getSchedular, addSchedular, updateSchedular, deleteSchedular, addLocation, getLocation, updateLocation, deleteLocation}