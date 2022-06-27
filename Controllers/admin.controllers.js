const { User, Role } = require('../Models/users.model')
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

// get all users
const getUsers = async(req, res) => {
    try {
        const users = await User.find({});
        if (users.length == 0) return res.status(404).json({ msg: "No user Found" })

        return res.send(users)

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
        if (req.body.roles) {
            const updaterole = await Role.findOneAndUpdate({ name: req.body.name }, {
                $set: {
                    user_id: req.params.id
                }
            }, { new: true })
            const ur = await updaterole.save();
            res.json(ur);
        }
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
            return res.status(403).json({ "message": "role not found" })
        })

    } catch (error) {
        return new Error(error)
    }
}
module.exports = { getUsers, addUser, updateUser, deleteUser, addRole, getRoles, deleteRole }