const { User, Role } = require('../Models/users.model')
const { Asset, assetsconfig } = require('../Models/assets.model')

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

        const users = await User.find({});
        const total = await User.count({});
        if (users.length == 0) return res.status(404).json({ msg: "No users Found" })

        return res.send({ users: users, total: total })

    } catch (err) {
        return res.status(500).json({ msg: err })
    }
}

//  add new user
const addUser = async(req, res) => {
    const newUser = new User(req.body)
    try {
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
        console.log(req.body)
            // if (req.body.roles) {
            //     const updaterole = await Role.findOneAndUpdate({ name: req.body.name }, {
            //         $set: {
            //             user_id: req.params.id
            //         }
            //     }, { new: true })
            //     const ur = await updaterole.save();
            //     res.json(ur);
            // }
        const updateuser = await User.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
        console.log(updateuser)
        const up = await updateuser.save();
        res.json(up);


    } catch (error) {
        return console.log(error.message)

    }

}

// Delete user
const deleteUser = async(req, res) => {
    try {
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
    try {
        let objId = []
            // const ogdata = req.body
        if (req.body.asset_list) {

            const updateasset = await Asset.find({ asset_name: req.body.asset_list.asset_name })
            console.log(updateasset.length)
            if (updateasset.length == 1) {
                objId.push(String(updateasset[0]._id))

            } else {
                for (let i = 0; i < updateasset.length; i++) {
                    objId.push(String(updateasset[i]._id))
                        // req.body.asset_list.asset_name[i] = objId[i]
                        // console.log(objId[i])

                }
            }
            console.log(req.body)
            console.log(objId)

        }
        // console.log(ogdata)


        const updateassetcategory = await assetsconfig.findByIdAndUpdate({ _id: req.params.id, "asset_list._id": objId }, { $push: req.body }, { new: true })
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


module.exports = { getUsers, addUser, updateUser, deleteUser, addRole, getRoles, deleteRole, getAsset, addAsset, deleteAsset, addAssetCategory, getAssetCategory, deleteAssetCategory, updateAssetCategory }