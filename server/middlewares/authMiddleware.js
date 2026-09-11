const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    try {
        // Get access token from cookie
        const token = req.cookies.accessToken

        if (!token) {
            return res.status(401).json({
                msg: "Not authenticated"

            })
        }

        // Verify token
        const decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        )

        // Store user information in request
        req.user = decoded

        next()

    } catch (error) {
        return res.status(401).json({
            msg: "Invalid or expired token"
        })
    }
}

module.exports = authMiddleware