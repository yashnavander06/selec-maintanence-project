const { User } = require('../Models/users.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Middleware/jsonToken.middleware')

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
        if (user.is_admin === true) return "admin"
        if (user.is_technician === true) return "technician"
        if (user.is_coordinator === true) return "co-ordinator"
    }
    return "Role Not Found"
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
                if (role) {
                    let token = generateToken(user.username, role)
                    res.status(200).json({ access_token: token });
                }
            }
            return res.status(401).json({ msg: 'incorrect password' });
        }
        return res.status(401).json({ error: "Username not found" })

    } catch (err) {
        return new Error(err)
    }

}

module.exports = { login }