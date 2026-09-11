import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/Login'
import Register from './pages/Register'
import ManagerDashboard from './pages/manager/ManagerDashboard'
import MemberDashboard from './pages/member/MemberDashboard'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AppLayout from './components/layout/AppLayout'
import WeeklyReportPage from './pages/WeeklyReportPage'
import MyReportsPage from './pages/member/MyReportsPage'
import EditMyReportPage from './pages/member/EditReportPage'
import ViewMyReportPage from './pages/member/ViewReportPage'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute allowedRole="member" />}>
          <Route element={<AppLayout />}>
            <Route path="/member-dashboard" element={<MemberDashboard />} />
            {/* View existing report */}
            <Route
              path="/member-report"
              element={<WeeklyReportPage />}
            />

            {/* Edit existing report */}
            <Route
              path="/member-report/:id/edit"
              element={<EditMyReportPage />}
            />
            <Route
              path="/member-report/:id"
              element={<ViewMyReportPage />}
            />
            <Route path="/member-reports" element={<MyReportsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Route>


// Manager routes
        <Route element={<ProtectedRoute allowedRole="manager" />}>
          <Route element={<AppLayout />}>
            <Route path="/manager-dashboard" element={<ManagerDashboard />} />
            <Route path="/profile" element={<ProfilePage />} />

          </Route>
        </Route>

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App