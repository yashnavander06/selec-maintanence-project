const { User } = require('../Models/users.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Middleware/jsonToken.middleware')
const config = require('../config.json')

async function findUser(username) {
    try {
        let user = await User.findOne({ "username": username })
        if (user)
            if (user.username === username) return user

    } catch (err) {
        throw new Error(err.message)
    }
}

function checkRole(user) {
    if (user) {
        if (user.role.name === config.ROLE.ADMIN) return config.ROLE.ADMIN
        if (user.role.name === config.ROLE.CO_ORDINATOR) return config.ROLE.CO_ORDINATOR
        if (user.role.name === config.ROLE.DEPARTMENT_HEAD) return config.ROLE.DEPARTMENT_HEAD
        if (user.role.name === config.ROLE.DESIGN) return config.ROLE.DESIGN
        if (user.role.name === config.ROLE.MANAGEMENT) return config.ROLE.MANAGEMENT
        if (user.role.name === config.ROLE.TECHNICIAN_EXTERNAL) return config.ROLE.TECHNICIAN_EXTERNAL
        if (user.role.name === config.ROLE.TECHNICIAN_INTERNAL) return config.ROLE.TECHNICIAN_INTERNAL
    }
    return new Error("Role Not Found")
}

const login = async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        let user = await findUser(username)
        if (user) {
            let role = checkRole(user)
            const compare = await bcrypt.compare(password, user.password)
            if (compare) {
                if (role !== null) {
                    let token = generateToken(user.username, role)
                    res.status(201).json({ access_token: token });
                }
                return res.status(404).json({ error: role })
            }
            return res.status(400).json({ msg: 'incorrect password' });
        }
        return res.status(404).json({ error: "Username not found" })

    } catch (err) {
        return new Error(err)
    }

}

module.exports = { login }