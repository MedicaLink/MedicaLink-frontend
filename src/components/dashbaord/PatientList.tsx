import { useState, useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import axiosInstance from "../../axiosInstance";
import { useAlertSnack, AlertType } from "../AlertSnack";
import { Patient } from "../../models/Patient";

function PatientList() {
    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState<Patient[]>([]);
    const { showAlert } = useAlertSnack();

    useEffect(() => {
        // Make the api call and fetch patients
        const fetchData = async () => {

            try {
                const response = await axiosInstance.get('/api/patient/latest');
                console.log(response.data);
                setPatientData(response.data);

                setLoading(false); // Remove skeletons after fetching data
            } catch (error) {
                console.error('Error fetching data:', error); // Handle errors
                showAlert('Error', 'Couldn\'t fetch patient data', AlertType.error);
            }
        };

        fetchData();
    }, []);

    return (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">NO.</th>
                    <th scope="col">Patient</th>
                    <th scope="col">Added Date</th>
                    <th scope="col">Added By</th>
                </tr>
            </thead>

            <tbody>

                {loading ? (
                    Array.from({ length: 5 }).map((item, index: number) => {
                        return (
                            <tr key={index}>
                                <th scope="row">
                                    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
                                </th>
                                <td>
                                    <div className="patient">
                                        <Skeleton variant="circular" width={50} height={50} />
                                        <div className="d-none d-md-block">
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={150} />
                                            <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={90} />
                                        </div>
                                    </div>
                                </td>
                                <td><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></td>
                                <td><Skeleton variant="text" sx={{ fontSize: '1rem' }} /></td>
                            </tr>
                        )
                    })
                ) : (
                    patientData.map(patient => {
                        return (
                            <tr key={patient.id}>
                                <th scope="row">{patient.id}</th>
                                <td>
                                    <div className="patient">
                                        <img src={patient.profileImage} alt="profile-image" />
                                        <div>
                                            <span className="fw-medium">{patient.nic}</span>
                                            <span>{patient.name}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>{patient.registeredDate}</td>
                                <td>{patient.admin.name}</td>
                            </tr>
                        )
                    })
                )
                }

            </tbody>
        </table>
    );
}

export default PatientList;