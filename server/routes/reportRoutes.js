const express = require('express')

const router = express.Router()

const authMiddleware = require('../middlewares/authMiddleware')
const roleMiddleware = require('../middlewares/roleMiddleware')

const {
    createReport,
    getMyReports,
    getMyReport,
    updateReport,
    submitReport,
    getReports,
    getReport,
    reviewReport
} = require('../controllers/ReportController')


// Member routes
router.post('/', authMiddleware, roleMiddleware('member'), createReport)
router.get('/my-reports', authMiddleware, roleMiddleware('member'), getMyReports)
router.get('/my-reports/:id', authMiddleware, roleMiddleware('member'), getMyReport)
router.put('/:id', authMiddleware, roleMiddleware('member'), updateReport)
router.put('/:id/submit', authMiddleware, roleMiddleware('member'), submitReport)


// Manager routes
router.get('/', authMiddleware, roleMiddleware('manager'), getReports)
router.get('/:id', authMiddleware, roleMiddleware('manager'), getReport)
router.put('/:id/review', authMiddleware, roleMiddleware('manager'), reviewReport)


module.exports = router