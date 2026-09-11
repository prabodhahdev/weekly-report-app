const mongoose = require('mongoose')

const taskCompletedSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
            trim: true
        },

        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium'
        },

        plannedPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        actualPercentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },

        status: {
            type: String,
            enum: [
                'completed',
                'in_progress',
                'not_started'
            ],
            default: 'completed'
        },

        plannedHours: {
            type: Number,
            min: 0,
            default: 0
        },

        spentHours: {
            type: Number,
            min: 0,
            default: 0
        },

        deliverable: {
            type: String,
            trim: true,
            default: ''
        }
    }
)

const plannedTaskSchema = new mongoose.Schema(
    {
        taskName: {
            type: String,
            required: true,
            trim: true
        }
    }
)

const blockerSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },

        isKey: {
            type: Boolean,
            default: false
        }
    }
)

const achievementSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },

        isKey: {
            type: Boolean,
            default: false
        }
    }
)

const reportVersionSchema = new mongoose.Schema(
    {
        report: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Report',
            required: true
        },

        versionNumber: {
            type: Number,
            required: true
        },

        weekStart: {
            type: Date,
            required: true
        },

        weekEnd: {
            type: Date,
            required: true
        },

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },

        tasksCompleted: {
            type: [taskCompletedSchema],
            default: []
        },

        tasksPlanned: {
            type: [plannedTaskSchema],
            default: []
        },

        blockers: {
            type: [blockerSchema],
            default: []
        },

        achievements: {
            type: [achievementSchema],
            default: []
        },

        hours: {
            development: {
                type: Number,
                min: 0,
                default: 0
            },

            testing: {
                type: Number,
                min: 0,
                default: 0
            },

            meetings: {
                type: Number,
                min: 0,
                default: 0
            },

            documentation: {
                type: Number,
                min: 0,
                default: 0
            }
        },

        notes: {
            type: String,
            trim: true,
            default: ''
        },

        status: {
            type: String,
            enum: [
                'draft',
                'submitted',
                'needs_correction',
                'approved'
            ],
            default: 'draft'
        },

        managerComment: {
            type: String,
            trim: true,
            default: ''
        },

        submittedAt: {
            type: Date,
            default: null
        },

        reviewedAt: {
            type: Date,
            default: null
        },

        reviewedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: null
        }
    },
    {
        timestamps: true
    }
)

reportVersionSchema.index(
    { report: 1, versionNumber: 1 },
    { unique: true }
)

const ReportVersion = mongoose.model(
    'ReportVersion',
    reportVersionSchema
)

module.exports = ReportVersion