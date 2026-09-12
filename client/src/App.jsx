import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from '@/pages/auth/Login'
import Register from '@/pages/auth/Register'
import ManagerDashboard from '@/pages/manager/ManagerDashboard'
import MemberDashboard from '@/pages/member/MemberDashboard'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import AppLayout from '@/components/layout/AppLayout'
import WeeklyReportPage from '@/pages/WeeklyReportPage'
import MyReportsPage from '@/pages/member/MyReportsPage'
import EditMyReportPage from '@/pages/member/EditReportPage'
import ViewMyReportPage from '@/pages/member/ViewReportPage'
import ProfilePage from '@/pages/ProfilePage'
import ReportsPage from '@/pages/manager/reports/ReportsPage'
import ReviewQueuePage from '@/pages/manager/ReviewQueuePage'
import TeamMembersPage from '@/pages/manager/TeamMembersPage'
import UserManagement from '@/pages/manager/users/UserManagement'
import ManagerProjects from '@/pages/manager/projects/ManagerProjects'
import AddProject from '@/pages/manager/projects/AddProject'
import ViewProject from '@/pages/manager/projects/ViewProject'
import EditProject from '@/pages/manager/projects/EditProject'
import AddUser from '@/pages/manager/users/AddUser'
import TeamMemberProfilePage from '@/pages/manager/TeamMemberProfilePage'
import ManagerViewReport from '@/pages/manager/ManagerViewReport'
import ManagerWeeklySummary from '@/pages/manager/ManagerWeeklySummary'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute allowedRole="member" />}>
          <Route element={<AppLayout />}>
            <Route path="/member-dashboard" element={<MemberDashboard />} />
            <Route path="/member-report" element={<WeeklyReportPage />} />
            <Route path="/member-report/:id/edit" element={<EditMyReportPage />} />
            <Route path="/member-report/:id" element={<ViewMyReportPage />} />
            <Route path="/member-reports" element={<MyReportsPage />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="manager" />}>
          <Route element={<AppLayout />}>
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/manager-reports" element={<ReportsPage />} />
            <Route path="/manager-review" element={<ReviewQueuePage />} />
            <Route path="/manager-team" element={<TeamMembersPage />} />
            <Route path="/manager-users" element={<UserManagement />} />
            <Route path="/manager-projects" element={<ManagerProjects />} />
            <Route path="/manager-projects/new" element={<AddProject />} />
            <Route path="/manager-projects/:id" element={<ViewProject />} />
            <Route path="/manager-projects/:id/edit" element={<EditProject />} />
            <Route path="/manager-users/new" element={<AddUser />} />
            <Route path="/manager-team/:id" element={<TeamMemberProfilePage />} />
            <Route path="/manager-report/:id" element={<ManagerViewReport />} />
            <Route path="/manager-team-summery" element={<ManagerWeeklySummary />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
