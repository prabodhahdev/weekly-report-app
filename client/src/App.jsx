import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import Register from './pages/Register'
import ManagerDashboard from './pages/ManagerDashboard'
import MemberDashboard from './pages/MemberDashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import WeeklyReportPage from './pages/WeeklyReportPage'
import MyReportsPage from './pages/MyReportsPage'

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
             <Route path="/member-reports" element={<MyReportsPage />} />
   {/*<Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Route>

        <Route element={<ProtectedRoute allowedRole="manager" />}>
          <Route element={<AppLayout />}>
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            {/* <Route path="/manager-reports" element={<ManagerReports />} />
    <Route path="/manager-projects" element={<ManagerProjects />} />
    <Route path="/manager-team" element={<ManagerTeam />} />
    <Route path="/profile" element={<Profile />} /> */}
          </Route>
        </Route>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App