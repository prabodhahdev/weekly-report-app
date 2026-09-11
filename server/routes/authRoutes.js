const express = require('express')
const {register,login , refresh, logout, getProfile} = require('../controllers/authController')
const registerValidator = require('../middlewares/validators/authValidator')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.post('/register', registerValidator, register)
router.post('/login', login)
router.get('/refresh', refresh)
router.post('/logout', logout )

router.get('/profile', authMiddleware,getProfile)

module.exports = router