const { validateToken, decodeToken } = require('../Middleware/jsonToken.middleware')

function checkRole(req, res) {

    if (req.valid) {
        console.log(req.valid)
    }
}

function checkAuth(req, res, next) {
    const token = req.header('access-token')
    if (token !== null) {
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