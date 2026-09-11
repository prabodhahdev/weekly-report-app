const Report = require('../models/Report')
const ReportVersion = require('../models/ReportVersion')
const Project = require('../models/Project')


// Create a new report
const createReport = async (req, res) => {
    try {
        const {
            weekStart,
            project,
            tasksCompleted,
            tasksPlanned,
            blockers,
            achievements,
            hours,
            notes
        } = req.body

        if (!weekStart || !project) {
            return res.status(400).json({
                message: 'Week and project are required'
            })
        }

        const startDate = new Date(weekStart)

        if (isNaN(startDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid week start date'
            })
        }

        const weekEnd = new Date(startDate)
        weekEnd.setDate(weekEnd.getDate() + 6)

        const selectedProject = await Project.findById(project)

        if (!selectedProject) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        const existingReport = await Report.findOne({
            member: req.user.userId,
            weekStart: startDate
        })

        if (existingReport) {
            return res.status(400).json({
                message: 'A report already exists for this week'
            })
        }

        const report = new Report({
            member: req.user.userId,
            weekStart: startDate,
            weekEnd,
            project,
            status: 'draft'
        })

        await report.save()

        const version = new ReportVersion({
            report: report._id,
            versionNumber: 1,
            weekStart: startDate,
            weekEnd,
            project,
            tasksCompleted: tasksCompleted || [],
            tasksPlanned: tasksPlanned || [],
            blockers: blockers || [],
            achievements: achievements || [],
            hours: hours || {},
            notes: notes || '',
            status: 'draft'
        })

        await version.save()

        report.currentVersion = version._id

        await report.save()

        return res.status(201).json({
            message: 'Report created successfully',
            report,
            version
        })

    } catch (error) {
        console.error('Create report error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get my reports
const getMyReports = async (req, res) => {
    try {
        const reports = await Report.find({
            member: req.user.userId
        })
            .populate('project', 'name')
            .populate('currentVersion')
            .sort({ weekStart: -1 })

        return res.status(200).json({
            reports
        })

    } catch (error) {
        console.error('Get my reports error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get one of my reports with all versions
const getMyReport = async (req, res) => {
    try {
        const { id } = req.params

        const report = await Report.findOne({
            _id: id,
            member: req.user.userId
        })
            .populate('member', 'name email')
            .populate('project', 'name description')
            .populate('currentVersion')

        if (!report) {
            return res.status(404).json({
                message: 'Report not found'
            })
        }

        const versions = await ReportVersion.find({
            report: report._id
        })
            .populate('project', 'name')
            .populate('reviewedBy', 'name email')
            .sort({ versionNumber: -1 })

        return res.status(200).json({
            report,
            versions
        })

    } catch (error) {
        console.error('Get my report error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Update current report
const updateReport = async (req, res) => {
    try {
        const { id } = req.params

        const {
            weekStart,
            project,
            tasksCompleted,
            tasksPlanned,
            blockers,
            achievements,
            hours,
            notes
        } = req.body

        const report = await Report.findOne({
            _id: id,
            member: req.user.userId
        })

        if (!report) {
            return res.status(404).json({
                message: 'Report not found'
            })
        }

        if (
            report.status === 'submitted' ||
            report.status === 'approved'
        ) {
            return res.status(400).json({
                message: 'This report cannot be edited'
            })
        }

        if (!weekStart || !project) {
            return res.status(400).json({
                message: 'Week and project are required'
            })
        }

        const selectedProject = await Project.findById(project)

        if (!selectedProject) {
            return res.status(404).json({
                message: 'Project not found'
            })
        }

        const startDate = new Date(weekStart)

        if (isNaN(startDate.getTime())) {
            return res.status(400).json({
                message: 'Invalid week start date'
            })
        }

        const weekEnd = new Date(startDate)
        weekEnd.setDate(weekEnd.getDate() + 6)

        const currentVersion = await ReportVersion.findById(
            report.currentVersion
        )

        if (!currentVersion) {
            return res.status(404).json({
                message: 'Current report version not found'
            })
        }

        /*
         * Draft:
         * Update the existing draft version.
         *
         * Needs correction:
         * Create a completely new version.
         */

        if (report.status === 'needs_correction') {
            const latestVersion = await ReportVersion.findOne({
                report: report._id
            }).sort({ versionNumber: -1 })

            const newVersionNumber =
                latestVersion.versionNumber + 1

            const newVersion = new ReportVersion({
                report: report._id,
                versionNumber: newVersionNumber,
                weekStart: startDate,
                weekEnd,
                project,
                tasksCompleted: tasksCompleted || [],
                tasksPlanned: tasksPlanned || [],
                blockers: blockers || [],
                achievements: achievements || [],
                hours: hours || {},
                notes: notes || '',
                status: 'needs_correction',
                managerComment: ''
            })

            await newVersion.save()

            report.weekStart = startDate
            report.weekEnd = weekEnd
            report.project = project
            report.currentVersion = newVersion._id
            report.status = 'needs_correction'

            await report.save()

            return res.status(200).json({
                message: 'New report version created successfully',
                report,
                version: newVersion
            })
        }

        currentVersion.weekStart = startDate
        currentVersion.weekEnd = weekEnd
        currentVersion.project = project
        currentVersion.tasksCompleted =
            tasksCompleted || []
        currentVersion.tasksPlanned =
            tasksPlanned || []
        currentVersion.blockers =
            blockers || []
        currentVersion.achievements =
            achievements || []
        currentVersion.hours =
            hours || {}
        currentVersion.notes =
            notes || ''
        currentVersion.status = 'draft'

        await currentVersion.save()

        report.weekStart = startDate
        report.weekEnd = weekEnd
        report.project = project
        report.status = 'draft'

        await report.save()

        return res.status(200).json({
            message: 'Report updated successfully',
            report,
            version: currentVersion
        })

    } catch (error) {
        console.error('Update report error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Submit report
const submitReport = async (req, res) => {
    try {
        const { id } = req.params

        const report = await Report.findOne({
            _id: id,
            member: req.user.userId
        })

        if (!report) {
            return res.status(404).json({
                message: 'Report not found'
            })
        }

        if (report.status === 'submitted') {
            return res.status(400).json({
                message: 'Report is already submitted'
            })
        }

        if (report.status === 'approved') {
            return res.status(400).json({
                message: 'Approved report cannot be submitted again'
            })
        }

        const version = await ReportVersion.findById(
            report.currentVersion
        )

        if (!version) {
            return res.status(404).json({
                message: 'Current report version not found'
            })
        }

        version.status = 'submitted'
        version.submittedAt = new Date()

        await version.save()

        report.status = 'submitted'

        await report.save()

        return res.status(200).json({
            message: 'Report submitted successfully',
            report,
            version
        })

    } catch (error) {
        console.error('Submit report error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get all reports for manager
const getReports = async (req, res) => {
    try {
        const {
            member,
            project,
            status,
            weekStart
        } = req.query

        const filter = {}

        if (member) {
            filter.member = member
        }

        if (project) {
            filter.project = project
        }

        if (status) {
            filter.status = status
        }

        if (weekStart) {
            const startDate = new Date(weekStart)

            const endDate = new Date(startDate)
            endDate.setDate(endDate.getDate() + 7)

            filter.weekStart = {
                $gte: startDate,
                $lt: endDate
            }
        }

        const reports = await Report.find(filter)
            .populate('member', 'name email role')
            .populate('project', 'name description')
            .populate('currentVersion')
            .sort({ weekStart: -1, updatedAt: -1 })

        return res.status(200).json({
            reports
        })

    } catch (error) {
        console.error('Get reports error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Get one report for manager with all versions
const getReport = async (req, res) => {
    try {
        const { id } = req.params

        const report = await Report.findById(id)
            .populate('member', 'name email role')
            .populate('project', 'name description')
            .populate('currentVersion')

        if (!report) {
            return res.status(404).json({
                message: 'Report not found'
            })
        }

        const versions = await ReportVersion.find({
            report: report._id
        })
            .populate('project', 'name')
            .populate('reviewedBy', 'name email')
            .sort({ versionNumber: -1 })

        return res.status(200).json({
            report,
            versions
        })

    } catch (error) {
        console.error('Get manager report error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


// Review report
const reviewReport = async (req, res) => {
    try {
        const { id } = req.params
        const { action, comment } = req.body

        if (!['approved', 'needs_correction'].includes(action)) {
            return res.status(400).json({
                message: 'Invalid review action'
            })
        }

        if (
            action === 'needs_correction' &&
            !comment?.trim()
        ) {
            return res.status(400).json({
                message: 'Comment is required when requesting changes'
            })
        }

        const report = await Report.findById(id)

        if (!report) {
            return res.status(404).json({
                message: 'Report not found'
            })
        }

        if (report.status !== 'submitted') {
            return res.status(400).json({
                message: 'Only submitted reports can be reviewed'
            })
        }

        const version = await ReportVersion.findById(
            report.currentVersion
        )

        if (!version) {
            return res.status(404).json({
                message: 'Current report version not found'
            })
        }

        version.status = action
        version.managerComment =
            action === 'needs_correction'
                ? comment.trim()
                : ''
        version.reviewedAt = new Date()
        version.reviewedBy = req.user.userId

        await version.save()

        report.status = action

        await report.save()

        return res.status(200).json({
            message:
                action === 'approved'
                    ? 'Report approved successfully'
                    : 'Report sent back for correction',
            report,
            version
        })

    } catch (error) {
        console.error('Review report error:', error)

        return res.status(500).json({
            message: 'Server error'
        })
    }
}


module.exports = {
    createReport,
    getMyReports,
    getMyReport,
    updateReport,
    submitReport,
    getReports,
    getReport,
    reviewReport
}