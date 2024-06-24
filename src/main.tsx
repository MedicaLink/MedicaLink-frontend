import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.tsx'
import './index.css'
// import Dashboard from './components/dashbaord/Dashboard.tsx'
import DoctorDashboard from './components/dashbaord/DoctorDashboard.tsx'
import AdminSearchPanel from './components/search/AdminSearchPanel.tsx'
import NotFound from './NotFound.tsx'
import AdminPatientPanel from './components/patient/AdminPatientPanel.tsx'
import WorkingOnIt from './components/WorkingOnIt.tsx'
import Settings from './components/settings/Settings.tsx'
import Profile, {MedicalRecords, ProfileOverview, VaccinationDetails } from './components/patient/profile/Profile.tsx'
import ProfileReports, { MedicalRecordsTable, VaccinationTable, AllergyReactionsTable } from './components/patient/profile/ProfileReports.tsx'
import { AdminOverview } from './components/admin/AdminOverview.tsx'
import { PatientRegistrationForm } from './components/patient/PatientRegistrationForm.tsx'
// import AdminLogIn from './components/login/AdminLogIn.tsx'
import AdminLogIn from './components/login/AdminLogIn.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <DoctorDashboard />
      },
      {
        path: '/search',
        element: <AdminSearchPanel />
      },
      {
        path: '/patient',
        element: <AdminPatientPanel />,
      },
      {
        path:'/patient/add',
        element: <PatientRegistrationForm />
      },
      {
        path: '/comments',
        element: <WorkingOnIt />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/patient/:patientId',
        element: <Profile />,
        children : [
          {
            path:'overview',
            element: <ProfileOverview />,
            children: [
              {
                index: true,
                element: <VaccinationDetails />
              },
              {
                path: 'records',
                element: <MedicalRecords />
              }
            ]
          },
          {
            path: '/patient/:patientId/reports',
            element: <ProfileReports />,
            children : [
              {
                index: true,
                element: <VaccinationTable />
              },
              {
                path: 'medicals',
                element: <MedicalRecordsTable />
              },
              {
                path: 'allergies',
                element: <AllergyReactionsTable />
              }
            ]
          },
        ]
      },
      {
        path:'/profile',
        element: <AdminOverview/>
      }
    ],
    errorElement: <NotFound />
  },
  {
    path:'/login',
    element: <AdminLogIn/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
