import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Login from './components/authComponents/Login'
import Signup from './components/authComponents/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browser from './components/Browser'
import Profile from './components/Profile'
import JobDiscription from './components/sharedComponents/JobDiscription'
import Companies from './Admin/Companies'
import CreateCompany from './Admin/CreateCompany'
import CompanySetup from './Admin/CompanySetup'
import AdminJobs from './Admin/AdminJobs'
import CreateAdminJob from './Admin/CreateAdminJob'
import Applicants from './Admin/Applicants'
import ProtectedRoute from './Admin/ProtectedRoute'
import UpdateAdminJob from './Admin/UpdateAdminJob'



const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/browser',
    element: <Browser />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/jobs/discription/:id',
    element: <JobDiscription />
  },


  {
    path: '/admin/companies',
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create',
    element: <ProtectedRoute><CreateCompany /></ProtectedRoute>
  },
  {
    path: '/admin/companies/create/:id',
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: '/admin/jobs',
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/update/:id',
    element: <ProtectedRoute><UpdateAdminJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/create',
    element: <ProtectedRoute><CreateAdminJob /></ProtectedRoute>
  },
  {
    path: '/admin/jobs/applicants/:id',
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },

])

function App() {


  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
