const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema(
    {
        member: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
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

        currentVersion: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ReportVersion',
            default: null
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
        }
    },
    {
        timestamps: true
    }
)

reportSchema.index(
    { member: 1, weekStart: 1 },
    { unique: true }
)

const Report = mongoose.model('Report', reportSchema)

module.exports = Report