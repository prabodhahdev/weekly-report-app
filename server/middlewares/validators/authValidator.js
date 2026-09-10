const { body, validationResult } = require('express-validator')

const registerValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/[A-Z]/)
        .withMessage('Password must contain at least one uppercase letter')
        .matches(/[a-z]/)
        .withMessage('Password must contain at least one lowercase letter')
        .matches(/[0-9]/)
        .withMessage('Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/)
        .withMessage('Password must contain at least one special character'),

    body('role')
        .isIn(['member', 'manager'])
        .withMessage('Invalid role'),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        next()
    }
]

module.exports = registerValidator