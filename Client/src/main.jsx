import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';

import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import Login from './pages/login.jsx'
import Signup from './pages/signup.jsx'
import UserDashboard from './pages/userdashboard.jsx'
import LandingPage from './pages/landingpage.jsx'
import ReportIssue from './pages/reportissue.jsx'
import Recentreport from './pages/recentreport.jsx';
import Admindashboard from './pages/admindashboard.jsx';
import AdminRecentReport from './pages/adminrecentreport.jsx';
import EditProfile from './pages/editprofile.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import Account from './pages/account.jsx';

const router = createBrowserRouter([

  { path: '/', element: <LandingPage /> },
  { path: '/app', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  { path: '/userdashboard', element: <UserDashboard /> },
  { path: '/admindashboard', element: <Admindashboard /> },
  { path: '/reportissue', element: <ReportIssue /> },
  { path: '/recentreports', element: <Recentreport /> },
  { path: '/recentreport', element: <Recentreport /> },
  { path: '/adminrecentreport', element: <AdminRecentReport /> },
  { path: '/editprofile', element: <EditProfile /> },
  { path: '/account', element: <Account /> },
  { path: '/forgotpassword', element: <ForgotPassword /> },
  { path: '/reset-password/:token', element: <ResetPassword /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
