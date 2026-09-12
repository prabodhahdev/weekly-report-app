const express = require('express')

const {
    chatWithAssistant
} = require('../controllers/aiController')

const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const router = express.Router()

router.post(
    '/chat',
    authMiddleware,
    roleMiddleware('manager'),
    chatWithAssistant
)

module.exports = router