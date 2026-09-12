const roleMiddleware = require('../middlewares/roleMiddleware')

describe('Role Middleware', () => {

    test('should deny access when user does not have the required role', () => {

        const req = {
            user: {
                role: 'member'
            }
        }

        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        const next = jest.fn()

        const middleware = roleMiddleware('manager')

        middleware(req, res, next)

        expect(res.status).toHaveBeenCalledWith(403)

        expect(res.json).toHaveBeenCalledWith({
            msg: 'Access denied'
        })

        expect(next).not.toHaveBeenCalled()
    })

})