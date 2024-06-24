import './DoctorDashboard.css';
import DoctorStats from './DoctorStats';
import PatientList from './PatientList';
import Chiranga from "../../assets/img/patients/Chiranga.jpg";
import Nisala from "../../assets/img/patients/Nisala.jpg";
import Seneli from "../../assets/img/patients/Seneli.jpg";
import Chathusha from "../../assets/img/patients/Chathusha.jpg";
import Nishadi from "../../assets/img/patients/Nishadi.jpg";

function Dashboard() {

    return (
        <>
    
            

            <div className="col-12" id="stats-section">

                <DoctorStats className="pb-4"/>

            </div>

            <div className="col-12 col-md-7" id="latest-patients">

                <div className="patients-container section-blur">

                    <h4>Recent Patients</h4>

                    <div className="patient-list mt-2">

                        <PatientList/>

                    </div>
                </div>

            </div>

            <div className="col-12 col-md-5" id="customer-comments">

                <div className="comment-container section-blur mt-4 mt-lg-0">

                    <h4>Comments & Reports</h4>

                    <div className="comment-list mt-2 pe-1">

                        <div className="comment mb-2">

                            <img src={Nishadi} alt="profile-image" />

                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit...
                            </p>
                            <div className="controls">
                                <span className="mb-2">10/12/2022 10:05</span>
                                <button>
                                    <span className="material-symbols-outlined">
                                        send
                                    </span>
                                </button>
                            </div>


                        </div>

                        <div className="comment mb-2">

                            <img src={Chiranga} alt="profile-image" />

                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit...
                            </p>
                            <div className="controls">
                                <span className="mb-2">10/12/2022 10:05</span>
                                <button>
                                    <span className="material-symbols-outlined">
                                        send
                                    </span>
                                </button>
                            </div>


                        </div>

                        <div className="comment">

                            <img src={Seneli} alt="profile-image" />

                            <p>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit...
                            </p>
                            <div className="controls">
                                <span className="mb-2">10/12/2022 10:05</span>
                                <button>
                                    <span className="material-symbols-outlined">
                                        send
                                    </span>
                                </button>
                            </div>


                        </div>

                    </div>
                </div>

            </div>
            <div className="col-12" id="latest-updates-section">

                <div className="update-container section-blur mt-4">

                    <h4>Latest Updates</h4>

                    <div className="update-list mt-2">

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
                                <tr>
                                    <th scope="row" className="d-none d-md-table-cell">1</th>
                                    <td>
                                        <div className="patient">
                                            <img src={Chathusha} alt="profile-image" />
                                            <div>
                                                <span className="fw-medium">200331015154</span>
                                                <span>Jane Cooper</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>22/10/2024 21:25</td>
                                    <td>@Dr. Suresh</td>
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
                                <tr>
                                    <th scope="row" className="d-none d-md-table-cell">2</th>
                                    <td>
                                        <div className="patient">
                                            <img src={Nisala} alt="profile-image" />
                                            <div>
                                                <span className="fw-medium">200331015154</span>
                                                <span>Jane Cooper</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>05/10/2024 09:10</td>
                                    <td>@doctor_Suresh</td>
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
                                <tr>
                                    <th scope="row" className="d-none d-md-table-cell">3</th>
                                    <td>
                                        <div className="patient">
                                            <img src={Nishadi} alt="profile-image" />
                                            <div>
                                                <span className="fw-medium">200331015154</span>
                                                <span>Simon Riley</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>10/05/2024 21:25</td>
                                    <td>@doctor_Johnny</td>
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
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>

        </>
    )
}

export default Dashboard;