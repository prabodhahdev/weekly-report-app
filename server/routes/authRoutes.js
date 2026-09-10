const express = require('express')
const {register,login , refresh, logout} = require('../controllers/authController')
const registerValidator = require('../middlewares/validators/authValidator')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router()

router.post('/register', registerValidator, register)
router.post('/login', login)
router.get('/refresh', refresh)
router.post('/logout', logout )

router.get('/profile', authMiddleware, (req, res) => {
    res.json({
        msg: "You are authenticated",
        user: req.user
    })
})

module.exports = router