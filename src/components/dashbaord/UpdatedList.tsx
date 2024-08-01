import patientImage from "../../assets/img/patients/patient.png";
import { useState } from "react";
import { Skeleton } from "@mui/material";

interface UpdatedListProps {
    className?: string
}

export default function UpdatedList({ className }: UpdatedListProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const patientList = [
        { id: 1, profile: 'public/profile/p9.jpg', referenceNo: '200331015154', name: 'Chathusha Mendis', date: '22/10/2024', updatedBy: 'Dr. Suresh' },
        { id: 2, profile: 'public/profile/p7.jpg', referenceNo: '200331012273', name: 'Nisala Dulanaka', date: '22/10/2024', updatedBy: 'Dr. Suresh' },
        { id: 3, profile: 'public/profile/p10.webp', referenceNo: '200331015154', name: 'Nishadi Silva', date: '22/10/2024', updatedBy: 'Dr. Suresh' }
    ]

    return (
        <div className={`update-list ${className}`}>

            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="d-none d-md-table-cell">#</th>
                        <th scope="col">Profile</th>
                        <th scope="col">Updated Date</th>
                        <th scope="col">Updated By</th>
                        <th scope="col">Description</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        isLoading? (
                            patientList.map((patient) => {
                                return (
                                    <tr key={patient.id}>
                                        <th scope="row" className="d-none d-md-table-cell">
                                            <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'20px'}/>
                                        </th>
                                        <td>
                                            <div className="patient">
                                                <Skeleton variant="circular" width={'50px'} height={'50px'}/>
                                                <div>
                                                    <Skeleton variant="text" sx={{fontSize:'1rem'}} width={'200px'}/>
                                                    <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'150px'}/>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'80px'}/>
                                        </td>
                                        <td>
                                            <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'80px'}/>
                                        </td>
                                        <td>
                                            <p className="update-description">
                                                <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'280px'}/>
                                                <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'270px'}/>
                                                <Skeleton variant="text" sx={{fontSize:'0.8rem'}} width={'200px'}/>
                                            </p>
                                        </td>
                                        <td>
                                            <span className="material-symbols-outlined">
                                                arrow_forward
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            patientList.map((patient) => {
                                return (
                                    <tr key={patient.id}>
                                        <th scope="row" className="d-none d-md-table-cell">{patient.id}</th>
                                        <td>
                                            <div className="patient">
                                                <img src={patient.profile} alt="profile-image" />
                                                <div>
                                                    <span className="fw-medium">{patient.referenceNo}</span>
                                                    <span>{patient.name}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{patient.date}</td>
                                        <td>@{patient.updatedBy}</td>
                                        <td>
                                            <p className="update-description">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                                Doloribus est nesciunt amet quo at in corporis quia ratione sit assumenda.
                                            </p>
                                        </td>
                                        <td>
                                            <span className="material-symbols-outlined">
                                                arrow_forward
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })
                        )
                    }
                </tbody>
            </table>

        </div>
    )
}