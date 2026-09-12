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

        const userMessage = message.trim()
        const lowerMessage = userMessage.toLowerCase()

        // Build report query

        const reportQuery = {
            status: {
                $in: ['submitted', 'approved', 'needs_correction']
            }
        }

        // Last week filter

        if (lowerMessage.includes('last week')) {
            const today = new Date()

            // Get Monday of current week
            const currentDay = today.getDay()

            const daysFromMonday =
                currentDay === 0
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

            reportQuery.weekStart = {
                $gte: lastMonday,
                $lt: currentMonday
            }
        }

        // Get reports


        const reports = await Report.find(reportQuery)
            .populate('member', 'name email')
            .populate('project', 'name')
            .populate('currentVersion')
        //prepare report data

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

                tasksCompleted: version?.tasksCompleted || [],

                tasksPlanned: version?.tasksPlanned || [],

                blockers: version?.blockers || [],

                achievements: version?.achievements || [],

                hours: version?.hours || {},

                notes: version?.notes || ''
            }
        })


        const totalReports = reports.length

        const submittedReports = reports.filter(
            report => report.status === 'submitted'
        ).length

        const approvedReports = reports.filter(
            report => report.status === 'approved'
        ).length

        const correctionReports = reports.filter(
            report => report.status === 'needs_correction'
        ).length

        const uniqueMembers = [
            ...new Set(
                reportData.map(report => report.member)
            )
        ]

        const uniqueProjects = [
            ...new Set(
                reportData.map(report => report.project)
            )
        ]

        const systemInstruction = `
You are an AI assistant for a software development team manager.

Answer questions using ONLY the weekly report information provided by the application.

Rules:

- Use only the provided report data and summary information.
- Do not invent or assume facts.
- You may summarize and combine information that exists in the reports.
- Use the actual member names, project names, tasks, dates, hours, blockers, achievements, and statuses.
- Keep completed tasks and planned tasks separate.
- Do not say a planned task was completed.
- A report is approved only when its status is "approved".
- For team questions, summarize information from all relevant reports.
- For member questions, use the relevant member's reports.
- For project questions, use the relevant project reports.
- For blocker questions, use the recorded blockers.
- For achievement questions, use the recorded achievements.
- For workload questions, use recorded hours and task information.
- For report-count questions, use the provided report counts.
- For "last week" questions, use only the reports provided for last week.
- If the information is genuinely not available, say:
  "I don't have that information in the available reports."
- Keep answers concise and easy to understand.
- Use simple bullet points when useful.
- Do not use Markdown headings.
- Do not use Markdown bold.
`

        const context = `
REPORT SUMMARY

Total reports: ${totalReports}
Submitted reports: ${submittedReports}
Approved reports: ${approvedReports}
Reports needing correction: ${correctionReports}

Members represented:
${uniqueMembers.join(', ') || 'None'}

Projects represented:
${uniqueProjects.join(', ') || 'None'}

REPORT DATA:

${JSON.stringify(reportData, null, 2)}
`
        const response = await ai.models.generateContent({
            model: 'gemini-3.5-flash-lite',

            config: {
                systemInstruction
            },

            contents: `
${context}

MANAGER'S QUESTION:

${userMessage}
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