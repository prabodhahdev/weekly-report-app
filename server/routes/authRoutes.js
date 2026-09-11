const express = require('express')
const {register,login , refresh, logout, getProfile, getUsers,createUser,updateUserRole,deleteUser} = require('../controllers/authController')
const registerValidator = require('../middlewares/validators/authValidator')
const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router()

router.post('/register', registerValidator, register)
router.post('/login', login)
router.get('/refresh', refresh)
router.post('/logout', logout )

router.get('/profile', authMiddleware,getProfile)

//create user ,edit role,delete user
router.get('/users', authMiddleware, roleMiddleware('manager'),getUsers)
router.post('/users', authMiddleware, roleMiddleware('manager'), createUser)
router.put('/users/:id/role', authMiddleware, roleMiddleware('manager'), updateUserRole)
router.delete('/users/:id', authMiddleware, roleMiddleware('manager'), deleteUser)

module.exports = router