const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const RefreshToken = require('../models/RefreshToken')

//Register
const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        // Check if user already exists
        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        // Save user
        await newUser.save()

        return res.status(201).json({
            msg: "User registered successfully"
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: "Server error"
        })
    }
}


//login
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        // 1. Find user
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({
                msg: "Invalid email or password"
            })
        }

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(401).json({
                msg: "Invalid email or password"
            })
        }

        // 3. Create Access Token
        const accessToken = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: process.env.JWT_ACCESS_EXPIRES }
        )

        // 4. Create Refresh Token
        const refreshToken = crypto.randomBytes(64).toString('hex')

        // 5. Hash the refresh token
        const refreshTokenHash = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex')

        // 6. Save HashedRefresh Token in the database
        await RefreshToken.create({
            userId: user._id,
            tokenHash: refreshTokenHash,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        })

        // 7. Send access token as HttpOnly cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        })
        // 8. Send refresh token as HttpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        console.log("LOGIN USER FROM DATABASE:", {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
})

return res.status(200).json({
    msg: "Login successful",
    user: {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
})

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: "Server error"
        })
    }
}

//refresh token
const refresh = async (req, res) => {
    try {
        // Get refresh token from cookie
        const refreshToken = req.cookies.refreshToken

        if (!refreshToken) {
            return res.status(401).json({
                msg: "Refresh token is required"
            })
        }

        // Hash the received refresh token
        const refreshTokenHash = crypto
            .createHash('sha256')
            .update(refreshToken)
            .digest('hex')

        // Find refresh token in database
        const storedToken = await RefreshToken.findOne({
            tokenHash: refreshTokenHash
        })

        if (!storedToken) {
            return res.status(401).json({
                msg: "Invalid refresh token"
            })
        }

        // Check if token was already revoked
        if (storedToken.revokedAt) {
            return res.status(401).json({
                msg: "Refresh token has been revoked"
            })
        }

        // Check if token is expired
        if (storedToken.expiresAt < new Date()) {
            return res.status(401).json({
                msg: "Refresh token has expired"
            })
        }

        // Find user
        const user = await User.findById(storedToken.userId)

        if (!user) {
            return res.status(401).json({
                msg: "User not found"
            })
        }

        // Revoke old refresh token
        storedToken.revokedAt = new Date()
        await storedToken.save()

        // Create new access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_ACCESS_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRES
            }
        )

        // Create new refresh token
        const newRefreshToken = crypto.randomBytes(64).toString('hex')

        // Hash new refresh token
        const newRefreshTokenHash = crypto
            .createHash('sha256')
            .update(newRefreshToken)
            .digest('hex')

        // Save new refresh token
        await RefreshToken.create({
            userId: user._id,
            tokenHash: newRefreshTokenHash,
            expiresAt: new Date(
                Date.now() + 7 * 24 * 60 * 60 * 1000
            )
        })

        // Set new access token cookie
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000
        })

        // Set new refresh token cookie
        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            msg: "Token refreshed successfully"
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: "Server error"
        })
    }
}

//logout
const logout = async (req, res) => {
    try {
        // Get refresh token from cookie
        const refreshToken = req.cookies.refreshToken

        if (refreshToken) {
            // Hash the refresh token
            const refreshTokenHash = crypto
                .createHash('sha256')
                .update(refreshToken)
                .digest('hex')

            // Find and revoke the refresh token
            await RefreshToken.findOneAndUpdate(
                { tokenHash: refreshTokenHash },
                { revokedAt: new Date() }
            )
        }

        // Clear access token cookie
        res.clearCookie('accessToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        // Clear refresh token cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        })

        return res.status(200).json({
            msg: "Logout successful"
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            msg: "Server error"
        })
    }
}

//get profile
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("name email role");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            user
        });

    } catch (error) {
        console.error("Profile error:", error);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('_id name email role')
            .sort({ name: 1 })

        res.status(200).json({
            users
        })

    } catch (error) {
        console.error('Get users error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}

// Create user by manager
const createUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save()

        return res.status(201).json({
            message: "User created successfully"
        })

    } catch (error) {
        console.error("Create user error:", error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}

// Update user role
const updateUserRole = async (req, res) => {
    try {
        const { role } = req.body

        if (!['member', 'manager'].includes(role)) {
            return res.status(400).json({
                message: "Invalid role"
            })
        }

        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        user.role = role

        await user.save()

        return res.status(200).json({
            message: "User role updated successfully"
        })

    } catch (error) {
        console.error("Update user role error:", error)

        return res.status(500).json({
            message: "Server error"
        })
    }
}


// Delete user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        // Prevent manager from removing themselves
        if (user._id.toString() === req.user.userId.toString()) {
            return res.status(400).json({
                message: "You cannot remove yourself"
            })
        }

        // Check if user is assigned to any project
        const assignedProject = await Project.findOne({
            members: req.params.id
        })

        if (assignedProject) {
            return res.status(400).json({
                message: "Cannot remove user. User is assigned to one or more projects."
            })
        }

        await user.deleteOne()

        return res.status(200).json({
            message: "User removed successfully"
        })

    } catch (error) {
        console.error("Delete user error:", error)

        return res.status(500).json({
            message: "User is assigned to projects. Cannot remove user."
        })
    }
}
module.exports = {
    register,
    login,
    refresh,
    logout,
    getProfile,
    getUsers,
    createUser,
    updateUserRole,
    deleteUser

}