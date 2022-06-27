const { validateToken, decodeToken } = require('../Middleware/jsonToken.middleware')

function checkRole(role) {
    return (req, res, next) => {
        if (req.valid) {
            try {
                let tokenRole = req.valid.role
                if (tokenRole === role) next();
                else {
                    res.json('You are not a authorized user')
                }
            } catch (error) {
                res.status(401).json({ error: error.message })
            }

        } else {
            res.json('Token Data Not Found')
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