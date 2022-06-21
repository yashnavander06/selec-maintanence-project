const { User } = require('../Models/users.model')
const bcrypt = require('bcrypt')
const { generateToken } = require('../Middleware/jsonToken.middleware')

async function findUser(username) {
    let user = await User.findOne({ "username": username })
    if (user.lenght < 1) return 0
    return user
}

function checkRole(user) {
    if (user) {
        if (user.is_admin === true) return "Admin"
        if (user.is_technician === true) return "Technician"
        if (user.is_coordinator === true) return "Coordinator"
    }
    return "Role Not Found"
}

const login = async(req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await findUser(username)
        let role = checkRole(user)

        if (!user) return res.status(401).json({ msg: "User Not Found" });

        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) return res.status(401).json({ msg: 'incorrect password' });
            if (role) {
                let token = generateToken(user.username, role)
                res.status(200).json({ access_token: token });
            }
            if (err) return res.json({ msg: err.message })
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }

}

module.exports = { login }