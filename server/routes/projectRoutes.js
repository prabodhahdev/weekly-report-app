const express =  require('express')

const {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    getMyProjects
} = require('../controllers/projectController.js')

const authMiddleware = require('../middlewares/authMiddleware.js')
const roleMiddleware = require('../middlewares/roleMiddleware.js')

const router = express.Router()


router.get('/my-projects', authMiddleware, roleMiddleware('member'), getMyProjects)

router.post('/', authMiddleware, roleMiddleware('manager'), createProject)
router.get('/', authMiddleware, roleMiddleware('manager'), getProjects)
router.get('/:id', authMiddleware, roleMiddleware('manager'), getProject)
router.put('/:id', authMiddleware, roleMiddleware('manager'), updateProject)
router.delete('/:id', authMiddleware, roleMiddleware('manager'), deleteProject)


module.exports = router