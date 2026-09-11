const Project = require('../models/Project.js')

// Create project
 const createProject = async (req, res) => {
    try {
        const { name, description, members } = req.body

        if (!name) {
            return res.status(400).json({
                message: 'Project name is required'
            })
        }

        const project = await Project.create({
            name,
            description,
            members: members || [],
            createdBy: req.user.userId
        })

        res.status(201).json({
            message: 'Project created successfully',
            project
        })

    } catch (error) {
        console.error('Create project error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get all projects
 const getProjects = async (req, res) => {
    try {
        const projects = await Project.find()
            .populate('createdBy', 'name email')
            .populate('members', 'name email')
            .sort({ createdAt: -1 })

        res.status(200).json({
            projects
        })

    } catch (error) {
        console.error('Get projects error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get single project
 const getProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)
            .populate('createdBy', 'name email')
            .populate('members', 'name email')

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        res.status(200).json({
            project
        })

    } catch (error) {
        console.error('Get project error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}


// Update project
 const updateProject = async (req, res) => {
    try {
        const { name, description, members, isActive } = req.body

        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        if (name !== undefined) {
            project.name = name
        }

        if (description !== undefined) {
            project.description = description
        }

        if (members !== undefined) {
            project.members = members
        }

        if (isActive !== undefined) {
            project.isActive = isActive
        }

        await project.save()

        res.status(200).json({
            message: 'Project updated successfully',
            project
        })

    } catch (error) {
        console.error('Update project error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}


// Delete project
 const deleteProject = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id)

        if (!project) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        await project.deleteOne()

        res.status(200).json({
            message: 'Project deleted successfully'
        })

    } catch (error) {
        console.error('Delete project error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get projects assigned to logged-in member
 const getMyProjects = async (req, res) => {
    try {
        const projects = await Project.find({
            members: req.user.userId,
            isActive: true
        })
            .select('name description')
            .sort({ name: 1 })

        res.status(200).json({
            projects
        })

    } catch (error) {
        console.error('Get my projects error:', error)

        res.status(500).json({
            message: 'Server error'
        })
    }
}



module.exports = {
    createProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    getMyProjects
}
