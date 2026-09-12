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
- Use ONLY the report data provided below.
- Never invent, guess, or assume information.
- Do not use outside knowledge or general assumptions.
- If the requested information is not available in the report data, say: "I don't have that information in the available reports."
- Do not create fake names, projects, tasks, hours, blockers, achievements, dates, or statuses.
- When mentioning a report, use the actual member name, project name, dates, and status from the provided data.
- For team summary questions, summarize the most important work, achievements, blockers, and workload.
- For workload questions, use only the recorded hours and task information.
- For blocker questions, list the blockers exactly based on the available reports.
- For achievement questions, summarize only the recorded achievements.
- For task questions, distinguish between completed tasks and planned tasks.
- Do not treat planned tasks as completed tasks.
- Do not treat submitted, approved, or needs_correction reports as approved unless their actual status says approved.
- When comparing team members, compare only information that exists for all relevant members.
- If one member has missing information, clearly indicate that it was not provided.
- For date-related questions, use the weekStart and weekEnd values from the report data.
- Do not change or reinterpret dates.
- Keep answers concise and easy for a manager to understand.
- Use bullet points when presenting multiple reports, members, tasks, or blockers.
- Do not use Markdown bold syntax such as **text**.
- Do not use Markdown headings with #.
- Use plain text and simple bullet points only.
- Do not repeat the entire report data unless the manager specifically asks for it.
- If the manager asks a question that cannot be answered from the provided reports, clearly state that the available report data does not contain the answer.
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