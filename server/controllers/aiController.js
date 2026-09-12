const { GoogleGenAI } = require('@google/genai')
const Report = require('../models/Report')

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

const chatWithAssistant = async (req, res) => {
    try {

        const { message } = req.body

        if (!message || !message.trim()) {
            return res.status(400).json({
                message: 'Message is required'
            })
        }

        // Only use reports that are not drafts
        let reportQuery = {
            status: {
                $in: ['submitted', 'approved', 'needs_correction']
            }
        }

        // Check if manager is asking about last week
        if (message.toLowerCase().includes('last week')) {

            const today = new Date()

            // Get Monday of the current week
            const currentDay = today.getDay()

            const daysFromMonday = currentDay === 0
                ? 6
                : currentDay - 1

            const currentMonday = new Date(today)

            currentMonday.setDate(
                today.getDate() - daysFromMonday
            )

            currentMonday.setHours(0, 0, 0, 0)

            // Get Monday of last week
            const lastMonday = new Date(currentMonday)

            lastMonday.setDate(
                currentMonday.getDate() - 7
            )

            // Monday of current week
            const thisMonday = new Date(currentMonday)

            reportQuery.weekStart = {
                $gte: lastMonday,
                $lt: thisMonday
            }
        }

        // Get reports from MongoDB
        const reports = await Report.find(reportQuery)
            .populate('member', 'name email')
            .populate('project', 'name')
            .populate('currentVersion')

        // Prepare report data for Gemini
        const reportData = reports.map(report => {

            const version = report.currentVersion

            return {
                member: report.member
                    ? report.member.name
                    : 'Unknown',

                project: report.project
                    ? report.project.name
                    : 'Unknown',

                weekStart: report.weekStart,
                weekEnd: report.weekEnd,

                status: report.status,

                tasksCompleted: version
                    ? version.tasksCompleted
                    : [],

                tasksPlanned: version
                    ? version.tasksPlanned
                    : [],

                blockers: version
                    ? version.blockers
                    : [],

                achievements: version
                    ? version.achievements
                    : [],

                hours: version
                    ? version.hours
                    : {},

                notes: version
                    ? version.notes
                    : ''
            }
        })

        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash-lite',

            contents: `
You are an AI assistant for a software development team manager.

The manager will ask questions about team members and their weekly reports.

Use ONLY the report data provided below.

Rules:
- Do not invent information.
- If the information is not available, clearly say so.
- Answer clearly and briefly.
- Mention team members and projects when useful.
- For summary questions, summarize the important points.
- For blocker questions, identify the main blockers.
- For workload questions, use the available task and hour information.
- Do not assume information that is not present in the reports.

REPORT DATA:

${JSON.stringify(reportData, null, 2)}

MANAGER'S QUESTION:

${message}
`
        })

        return res.status(200).json({
            answer: response.text
        })

    } catch (error) {

        console.error('AI assistant error:', error)

        return res.status(500).json({
            message: 'AI assistant failed'
        })
    }
}

module.exports = {
    chatWithAssistant
}