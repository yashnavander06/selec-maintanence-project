const { validateToken, decodeToken } = require('../Middleware/jsonToken.middleware')

// TODO Add finduser logic to middleware

// async function findUser(username) {
//     try {
//         let user = await User.findOne({ "username": username })
//         if (user)
//             if (user.username === username) return user

//     } catch (err) {
//         throw new Error(err.message)
//     }
// }

function checkRole(role) {
    return (req, res, next) => {
        if (req.valid) {
            try {
                let tokenRole = req.valid.role
                if (tokenRole === role) next();
                else {
                    res.status(401).json({ msg: 'You are not a authorized user' })
                }
            } catch (error) {
                res.status(401).json({ error: error.message })
            }

        } else {
            res.status(404).json({ msg: 'Token Data Not Found' })
        }

    }

}

function checkAuth(req, res, next) {
    const token = req.header('access-token')
    if (token) {
        try {
            const validate = validateToken(token)
            if (validate) {
                req.valid = validate
                next();
            }
        } catch (error) {
            res.status(401).json({ error: error.message })
        }

    } else {
        return res.status(403).json("Need to login!")
    }

}




module.exports = { checkAuth, checkRole }