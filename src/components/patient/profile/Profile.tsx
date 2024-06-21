import './Profile.css';
import './ProfileOverview.css';
import { ChevronDown, Virus2, Clipboard2Pulse } from 'react-bootstrap-icons';
import Chiranga from '../../../assets/img/patients/Chiranga.jpg';
import { Outlet, NavLink } from 'react-router-dom';

export function MedicalRecords() {

    return (
        <>
            <h5>Medical Records</h5>

            <div className="table-container mt-2 py-2 px-md-4">
                <div className="vaccination-table mt-2">
                    <div className="vhead">
                        <div className="vtr">
                            <div>#</div>
                            <div>Medical Service</div>
                            <div className="d-none d-md-block">Location</div>
                            <div className="d-none d-md-block">Doctor</div>
                            <div >Date</div>
                            <div>
                                <span className="material-symbols-outlined">
                                    description
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="vbody">
                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>MRI Scan</div>
                                <div className="d-none d-md-block">Heymas Hospitals</div>
                                <div className="d-none d-md-block">Dr. Banu</div>
                                <div >12/06/2003</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                    <a href="https://googledrive.com">Download Attachment</a>
                                </p>
                            </div>

                        </div>

                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>MRI Scan</div>
                                <div className="d-none d-md-block">Heymas Hospitals</div>
                                <div className="d-none d-md-block">Dr. Banu</div>
                                <div >12/06/2003</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                    <a href="https://googledrive.com">Download Attachment</a>
                                </p>
                            </div>

                        </div>

                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>MRI Scan</div>
                                <div className="d-none d-md-block">Nawaloka Hospitals</div>
                                <div className="d-none d-md-block">Dr. Banu</div>
                                <div >12/06/2003</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                    <a href="https://googledrive.com">Download Attachment</a>
                                </p>
                            </div>

                        </div>

                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>MRI Scan</div>
                                <div className="d-none d-md-block">Hemas Hospitals</div>
                                <div className="d-none d-md-block">Dr. Banu</div>
                                <div >12/06/2003</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                    <a href="https://googledrive.com">Download Attachment</a>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function VaccinationDetails() {

    return (
        <>
            <h5>Vaccination Details</h5>

            <div className="table-container mt-2 py-2 px-md-4">
                <div className="vaccination-table mt-2">
                    <div className="vhead">
                        <div className="vtr">
                            <div>#</div>
                            <div>Vaccine Type</div>
                            <div className="d-none d-md-block">Brand</div>
                            <div className="d-none d-md-block">Location</div>
                            <div >Date</div>
                            <div className="d-none d-md-block">Dose</div>
                            <div>
                                <span className="material-symbols-outlined">
                                    description
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="vbody">
                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>BCG</div>
                                <div className="d-none d-md-block">TheraCys® BCG</div>
                                <div className="d-none d-md-block">Hemas Hospitals</div>
                                <div >12/06/2003</div>
                                <div className="d-none d-md-block">10 Liters</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                </p>
                            </div>

                        </div>

                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>BCG</div>
                                <div className="d-none d-md-block">TheraCys® BCG</div>
                                <div className="d-none d-md-block">Hemas Hospitals</div>
                                <div >12/06/2003</div>
                                <div className="d-none d-md-block">10 Liters</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                </p>
                            </div>

                        </div>

                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>BCG</div>
                                <div className="d-none d-md-block">TheraCys® BCG</div>
                                <div className="d-none d-md-block">Hemas Hospitals</div>
                                <div >12/06/2003</div>
                                <div className="d-none d-md-block">10 Liters</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                </p>
                            </div>

                        </div>

                        <div className="vtr">
                            <div className="tr">
                                <div className="d-flex">
                                    <input type="checkbox" className="form-check me-2" />
                                    <span className="d-none d-md-block">22 : 25</span>
                                </div>
                                <div>BCG</div>
                                <div className="d-none d-md-block">TheraCys® BCG</div>
                                <div className="d-none d-md-block">Hemas Hospitals</div>
                                <div >12/06/2003</div>
                                <div className="d-none d-md-block">10 Liters</div>
                                <div>
                                    <button type="button" className="p-0 border-0 bg-transparent"
                                        data-bs-toggle="collapse" data-bs-target="#collapse1"
                                        aria-expanded="false" aria-controls="collapse1">
                                        <ChevronDown />
                                    </button>
                                </div>
                            </div>

                            <div className="notes px-3 py-2 collapse" id="collapse1">
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ProfileOverview() {

    return (
        <>
            <div className="col-12 col-lg-3">
                <div className="profile-main section-blur">
                    <div className="profile-image p-4">
                        <img src={Chiranga} alt="profile" />
                    </div>
                    <h4 className="title text-center">Chiranga Shalitha</h4>

                    <div className="container-fluid px-0">

                        <div className="row profile-section px-4 pt-3 gx-3">
                            <div className="col-12 col-md-6 col-lg-12">
                                <h5>Basic Information</h5>

                                <div className="container-fluid px-0 pb-3">
                                    <div className="row">
                                        <div className="profile-group col-12">
                                            <li className="title">Date of Birth</li>
                                            <li>14th June 2003</li>
                                        </div>

                                        <div className="profile-group col-6">
                                            <li className="title">Age</li>
                                            <li>20 Years</li>
                                        </div>

                                        <div className="profile-group col-6">
                                            <li className="title">Gender</li>
                                            <li>Male</li>
                                        </div>

                                        <div className="profile-group col-12">
                                            <li className="title">Address</li>
                                            <li>No 1124 Piliyandala road, Kesbewa</li>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12">
                                <h5>Other Information</h5>

                                <div className="container-fluid px-0 pb-3">
                                    <div className="row">
                                        <div className="profile-group">
                                            <li className="title">Blood Group</li>
                                            <li>B positive</li>
                                        </div>

                                        <div className="profile-group col-6">
                                            <li className="title">Height</li>
                                            <li>5 ft 3 inch</li>
                                        </div>

                                        <div className="profile-group col-6">
                                            <li className="title">Weight</li>
                                            <li>55 kg</li>
                                        </div>

                                        <div className="profile-group col-12">
                                            <li className="title">Registered By</li>
                                            <li>Hemas Hospitals - Colombo</li>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-12">
                                <button className="share-button py-2 mb-3">
                                    SHARE PROFILE <i className="bi bi-share-fill ms-2"></i>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="col mt-4 mt-lg-0">

                <div className="record-container px-4 py-3 section-blur">

                    <div className="section-controls py-3">

                        <div className="section-links">
                            <NavLink to="." className={({ isActive, isPending }) =>
                                isActive
                                    ? "active me-2 px-3 py-2"
                                    : isPending
                                    ? "pending me-2 px-3 py-2"
                                    : "me-2 px-3 py-2"
                            } end>
                                <span className="d-none d-md-inline">Vaccinations</span>
                                <Virus2 />
                            </NavLink>

                            <NavLink to="records" className={({ isActive, isPending }) =>
                                isActive
                                    ? "active me-2 px-3 py-2"
                                    : isPending
                                    ? "pending me-2 px-3 py-2"
                                    : "me-2 px-3 py-2"
                            }>
                                <span className="d-none d-md-inline">Medical Reports</span>
                                <Clipboard2Pulse />
                            </NavLink>
                        </div>

                        <div className="tag-links">
                            <a href="" className="me-1 px-3 py-1 active d-none d-md-block"># Last Week</a>
                            <a href="" className="me-1 px-3 py-1 d-none d-lg-block"># Last Month</a>
                            <a href="" className="me-2 px-3 py-1 d-none d-md-block"># All Time</a>
                        </div>

                    </div>

                    <hr />

                    <div className="record-data my-4">

                        <Outlet />

                    </div>
                </div>
            </div>
        </>
    );
}

function Profile() {

    // Check the logged in user type and reder the correct profile.
    return (
        <>
            <div className="col-12">

                <div className="profile-nav mb-4" id="profile-nav">

                    <NavLink to="overview" className="nav-link">Overview</NavLink>

                    <NavLink to="reports" className="nav-link">Reports</NavLink>

                </div>

            </div>

            <Outlet />
        </>
    );
}

export default Profile;