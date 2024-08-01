import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Root from './Root'
import { useEffect, useState } from 'react';
import './App.css'
import AdminDashboard from './components/dashbaord/Dashboard.tsx'
import AdminSearchPanel from './components/search/AdminSearchPanel.tsx'
import NotFound from './NotFound.tsx'
import AdminPatientPanel from './components/patient/AdminPatientPanel.tsx'
import WorkingOnIt from './components/WorkingOnIt.tsx'
import Settings from './components/settings/Settings.tsx'
import Profile, { MedicalRecords, ProfileOverview, VaccinationDetails } from './components/patient/profile/Profile.tsx'
import ProfileReports, { AllergyReactionsTable, MedicalRecordsTable, VaccinationTable } from './components/patient/profile/ProfileReports.tsx'
import { AdminOverview } from './components/admin/AdminOverview.tsx'
import { PatientEditForm, PatientRegistrationForm } from './components/patient/PatientRegistrationForm.tsx'
import { UseUser } from './components/auth/UserContext.tsx'
import LoginForm from './components/login/AdminLogIn.tsx';
import AlertSnack, { AlertSnackProvider } from './components/AlertSnack.tsx'
import DoctorDashboard from './components/dashbaord/DoctorDashboard.tsx'
import isLoggedIn from './components/auth/CheckUser.tsx';
import Logout from './components/login/Logout.tsx';
import PatientDashboard from './components/dashbaord/PatientDashboard.tsx';

function App() {
  let { user, setUser } = UseUser();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the user credentials if a token is present in the cookies
    const checkUserLogin = () => {
      let loggedUser = isLoggedIn();
      setUser(loggedUser);
      setLoading(false);
    };

    checkUserLogin();

    return () => { };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show a loading indicator
  }

  // Route definition
  const router = createBrowserRouter([
    {
      path: '/',
      element: user ? <Root /> : <Navigate to='/login' />,
      children: [
        {
          path: '/',
          element: user?.role == 'Admin' ? <AdminDashboard /> : (user?.role == "Doctor" ? <DoctorDashboard /> : <PatientDashboard />),
          children: user?.role == 'User' ? [
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
          element: (user?.role == 'Admin' || user?.role == 'Doctor' )? <AdminSearchPanel /> : <ProfileReports />,
          children: user?.role == 'User' ? [
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
          element: (user?.role == 'Admin' || user?.role == 'Doctor' ) ? <AdminPatientPanel /> : <NotFound />
        },
        {
          path: '/smarthealth',
          element: user?.role == 'User' || user?.role == 'Doctor' ? <WorkingOnIt /> : <NotFound />
        },
        {
          path: '/patient/add',
          element: user?.role == 'Admin' ? <PatientRegistrationForm isEdit={false} /> : <NotFound />
        },
        {
          path: '/patient/update',
          element: user?.role == 'Admin' ? <PatientEditForm /> : <NotFound />
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
          element: (user?.role == 'Admin' || user?.role == 'Doctor' ) ? <Profile /> : <Navigate to="/notfound" />,
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
                },
                {
                  path: 'allergies',
                  element: <AllergyReactionsTable />
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
      element: <LoginForm />
    },
    {
      path: '/logout',
      element: <Logout />
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
