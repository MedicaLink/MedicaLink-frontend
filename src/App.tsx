import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Root from './Root'
import './App.css'
import AdminDashboard from './components/dashbaord/Dashboard.tsx'
import AdminSearchPanel from './components/search/AdminSearchPanel.tsx'
import NotFound from './NotFound.tsx'
import AdminPatientPanel from './components/patient/AdminPatientPanel.tsx'
import WorkingOnIt from './components/WorkingOnIt.tsx'
import Settings from './components/settings/Settings.tsx'
import Profile, { MedicalRecords, ProfileOverview, VaccinationDetails } from './components/patient/profile/Profile.tsx'
import ProfileReports, { MedicalRecordsTable, VaccinationTable } from './components/patient/profile/ProfileReports.tsx'
import { AdminOverview } from './components/admin/AdminOverview.tsx'
import { PatientRegistrationForm } from './components/patient/PatientRegistrationForm.tsx'
import { UseUser } from './components/auth/UserContext.tsx'
import AdminLogIn from './components/login/AdminLogIn.tsx';
import AlertSnack, { AlertSnackProvider } from './components/AlertSnack.tsx'

function App() {
  const { user } = UseUser();

  // Route definition
  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Root /> : <Navigate to='/login' />,
      children: [
        {
          path: '/',
          element: user?.role == 'Admin' ? <AdminDashboard /> : <ProfileOverview />,
          children: user?.role == 'user' ? [
            {
              index: true,
              element: <VaccinationDetails />
            },
            {
              path: 'records',
              element: <MedicalRecords />
            }
          ] : []
        },
        {
          path: '/search',
          element: user?.role == 'Admin' ? <AdminSearchPanel /> : <ProfileReports />,
          children: user?.role == 'user' ? [
            {
              index: true,
              element: <VaccinationTable />
            },
            {
              path: 'medicals',
              element: <MedicalRecordsTable />
            }
          ] : []
        },
        {
          path: '/patient',
          element: user?.role == 'Admin' ? <AdminPatientPanel /> : <NotFound />
        },
        {
          path: '/smarthealth',
          element: user?.role == 'user' ? <WorkingOnIt /> : <NotFound />
        },
        {
          path: '/patient/add',
          element: user?.role == 'Admin' ? <PatientRegistrationForm /> : <NotFound />
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
          element: user?.role == 'Admin' ? <Profile /> : <Navigate to="/notfound"/>,
          children: [
            {
              path: 'overview',
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
              path: 'reports',
              element: <ProfileReports />,
              children: [
                {
                  index: true,
                  element: <VaccinationTable />
                },
                {
                  path: 'medicals',
                  element: <MedicalRecordsTable />
                }
              ]
            }
          ]
        },
        {
          path: '/profile',
          element: <AdminOverview />
        }
      ],
      errorElement: <NotFound />
    },
    {
      path: '/login',
      element: <AdminLogIn />
    }
  ]);

  return (
    <AlertSnackProvider>
      <RouterProvider router={router} />
      <AlertSnack />
    </AlertSnackProvider>
  );
}

export default App
