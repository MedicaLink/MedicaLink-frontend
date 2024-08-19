import './Profile.css';
import './ProfileOverview.css';
import { ChevronDown, Virus2, Clipboard2Pulse, ChevronUp } from 'react-bootstrap-icons';
import Chiranga from '../../../assets/img/patients/Chiranga.jpg';
import advertisement from '../../../assets/img/profie/ad-image.png';
import { useParams } from 'react-router-dom';
import { Outlet, NavLink } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import { Patient } from '../../../models/Patient';
import axiosInstance from '../../../axiosInstance';
import { useAlertSnack, AlertType } from '../../AlertSnack';
import { Vaccination } from '../../../models/Vaccination';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { UseUser } from '../../auth/UserContext';

export function MedicalRecords() {
    const { user } = UseUser();
    let { patientId } = useParams();
    patientId = user?.role == "User"? user.userId.toString() : patientId;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
    const headingCellStyles = { fontSize: '14px', fontWeight: 600, fontFamily: 'Poppins', paddingBottom: '10px', paddingTop: '6px' };

    useEffect(() => {
        const fetchMedicalRecords = async () => {
            if(!isLoading) setIsLoading(true);
            try{
                let response = await axiosInstance.get(`/api/medicalRecord?patientId=${patientId}`);

                if(response.data){
                    setMedicalRecords(response.data);
                    setIsLoading(false);
                }
            }catch(error){
                console.error(error);
            }
        };

        fetchMedicalRecords();

        return () => {};
    },[]);

    return (
        <>
            <h5>Medical Records</h5>

            <div className="table-container mt-2 py-2 px-md-4">

                <TableContainer id="report-table-container">
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headingCellStyles} align='center' className='d-none d-md-table-cell'>#</TableCell>
                                <TableCell sx={headingCellStyles}>Medical Service</TableCell>
                                <TableCell sx={headingCellStyles}>Medical Institution</TableCell>
                                <TableCell sx={headingCellStyles} className="d-none d-md-table-cell">Date</TableCell>
                                <TableCell sx={headingCellStyles} className='px-2 px-md-3'>
                                    <span className="material-symbols-outlined">
                                        description
                                    </span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading ? (
                                    Array.from({ length: 5 }).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className='d-none d-md-table-cell'><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell className='d-none d-md-table-cell'><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    medicalRecords.map((medicalRecord) => {
                                        return (
                                            <MedicalTableRow key={medicalRecord.id} medicalRecord={medicalRecord}/>
                                        );
                                    })
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}

interface MedicalTableRowProps {
    medicalRecord: MedicalRecord;
}

function MedicalTableRow({ medicalRecord }: MedicalTableRowProps) {
    const [open, setOpen] = React.useState(false);
    const bodyCellStyles = { fontSize: '14px', fontFamily: 'Poppins' };

    return (
        <React.Fragment>
            <TableRow>
                <TableCell scope="row" className='d-none d-md-table-cell'>
                    <div className="d-flex justify-content-center">
                        <input type="checkbox" className="form-check me-2" />
                        <span className="d-none d-md-block">22 : 25</span>
                    </div>
                </TableCell>
                <TableCell sx={bodyCellStyles}>{medicalRecord.recordType}</TableCell>
                <TableCell sx={bodyCellStyles}>{medicalRecord.admin.hospital?.name}</TableCell>
                <TableCell sx={bodyCellStyles} className="d-none d-md-table-cell">{medicalRecord.date}</TableCell>
                <TableCell sx={bodyCellStyles} className='px-2 px-md-3'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)} >
                        {open ? <ChevronUp /> : <ChevronDown />}

                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow className='description'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                            <div>
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    {medicalRecord.description}
                                    <a href={medicalRecord.filePath} className='d-block mt-3'>Download Attachment</a>
                                </p>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

export function VaccinationDetails() {
    const { user } = UseUser();
    let { patientId } = useParams();
    patientId = user?.role == "User"? user.userId.toString() : patientId;
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [vaccinations, setVaccinations] = useState<Vaccination[]>([]);
    const { showAlert } = useAlertSnack();
    const headingCellStyles = { fontSize: '14px', fontWeight: 600, fontFamily: 'Poppins', paddingBottom: '10px', paddingTop: '6px' };

    useEffect(() => {
        const fetchVaccinations = async () => {
            if (!isLoading) setIsLoading(true);
            try {
                let response = await axiosInstance.get(`/api/vaccinations?patientId=${patientId}`);

                if (response.data) {
                    setVaccinations(response.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error(error);
                showAlert("Error", "Vaccination could not be loaded", AlertType.error);
            }
        }

        fetchVaccinations();

        return () => {

        };
    }, []);

    return (
        <>
            <h5>Vaccination Details</h5>

            <div className="table-container mt-2 py-2 px-md-4">

                <TableContainer id="report-table-container">
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={headingCellStyles} align='center' className='d-none d-md-table-cell'>#</TableCell>
                                <TableCell sx={headingCellStyles}>Vaccine Type</TableCell>
                                <TableCell sx={headingCellStyles} className='d-none d-md-table-cell'>Brand</TableCell>
                                <TableCell sx={headingCellStyles}>Location</TableCell>
                                <TableCell sx={headingCellStyles}>Date</TableCell>
                                <TableCell sx={headingCellStyles} className='d-none d-md-table-cell'>Dose</TableCell>
                                <TableCell sx={headingCellStyles} className='px-2 px-md-3'>
                                    <span className="material-symbols-outlined">
                                        description
                                    </span>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                isLoading ? (
                                    Array.from({ length: 5 }).map((item, index) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell className='d-none d-md-table-cell'><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell className='d-none d-md-table-cell'><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell className='d-none d-md-table-cell'><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                                <TableCell><Skeleton variant='text' animation="wave"></Skeleton></TableCell>
                                            </TableRow>
                                        );
                                    })
                                ) : (
                                    vaccinations.map((vaccination) => {
                                        return <VaccinationTableRow key={vaccination.id} vaccination={vaccination} />;
                                    })
                                )
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </div>
        </>
    );
}

interface VaccinationTableRowProps {
    vaccination: Vaccination;
}

function VaccinationTableRow({ vaccination }: VaccinationTableRowProps) {
    const [open, setOpen] = React.useState(false);
    const bodyCellStyles = { fontSize: '14px', fontFamily: 'Poppins' };

    return (
        <React.Fragment>
            <TableRow>
                <TableCell scope="row" className='d-none d-md-table-cell'>
                    <div className="d-flex justify-content-center">
                        <input type="checkbox" className="form-check me-2" />
                        <span className="d-none d-md-block">{vaccination.id}</span>
                    </div>
                </TableCell>
                <TableCell sx={bodyCellStyles}>{vaccination.vaccineBrand?.vaccine.name}</TableCell>
                <TableCell sx={bodyCellStyles} className='d-none d-md-table-cell'>{vaccination.vaccineBrand?.brandName}</TableCell>
                <TableCell sx={bodyCellStyles}>{vaccination.hospital?.name}</TableCell>
                <TableCell sx={bodyCellStyles}>{vaccination.dateOfVaccination}</TableCell>
                <TableCell sx={bodyCellStyles} className='d-none d-md-table-cell'>{vaccination.dose}</TableCell>
                <TableCell sx={bodyCellStyles} className='px-2 px-md-3'>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)} >
                        {open ? <ChevronUp /> : <ChevronDown />}

                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow className='description'>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ paddingTop: 2, paddingBottom: 2 }}>
                            <div>
                                <h6 className="mt-2">Notes : </h6>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                    Dignissimos dicta, cumque deleniti consequatur fugiat asperiores qui
                                    sit
                                    animi beatae ab?
                                    <a href="https://googledrive.com" className='d-block mt-3'>Download Attachment</a>
                                </p>
                            </div>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export function ProfileOverview() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { user } = UseUser();
    let { patientId } = useParams();
    patientId = (user?.role == "User")? user.userId.toString() : patientId;
    const [patient, setPatient] = useState<Patient | null>(null);
    const { showAlert } = useAlertSnack();

    useEffect(() => {
        const fetchPatient = async () => {
            if (!isLoading) setIsLoading(true);
            try {
                let response = await axiosInstance.get(`/api/patient/${patientId}`);
                setPatient(response.data);

                setIsLoading(false);
            } catch (error) {
                console.error(error);
                showAlert("Error", "Patient details could not be loaded", AlertType.error);
            }
        }

        fetchPatient();

        return () => {

        };
    }, []);

    return (
        <>
            {
                isLoading ? (
                    <div className="col-12 col-lg-3">
                        <div className="profile-main section-blur">
                            <div className="profile-image p-4">
                                <Skeleton variant='circular' sx={{ bgcolor: 'grey.300' }} animation={'wave'} width={'160px'} height={'160px'} />
                            </div>
                            <div className="d-flex justify-content-center">
                                <Skeleton variant='text' sx={{ fontSize: '18px', textAlign: 'center' }} animation={'wave'}>
                                    <h4 className="title text-center">Chiranga Shalitha</h4>
                                </Skeleton>
                            </div>

                            <div className="container-fluid px-0">

                                <div className="row profile-section px-4 pt-3 gx-3">
                                    <div className="col-12 col-md-6 col-lg-12">
                                        <h5>Basic Information</h5>

                                        <div className="container-fluid px-0 pb-3">
                                            <div className="row">
                                                <div className="profile-group col-12">
                                                    <li className="title">Date of Birth</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>14th June 2003</li>
                                                    </Skeleton>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Age</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>20 Years</li>
                                                    </Skeleton>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Gender</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>Male</li>
                                                    </Skeleton>
                                                </div>

                                                <div className="profile-group col-12">
                                                    <li className="title">Address</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>No 1124 Piliyandala road, Kesbewa</li>
                                                    </Skeleton>
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
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>B positive</li>
                                                    </Skeleton>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Height</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>5 ft 3 inch</li>
                                                    </Skeleton>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Weight</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>55 kg</li>
                                                    </Skeleton>
                                                </div>

                                                <div className="profile-group col-12">
                                                    <li className="title">Registered By</li>
                                                    <Skeleton variant='text' animation='wave' sx={{ fontSize: '14px' }}>
                                                        <li>Hemas Hospitals - Colombo</li>
                                                    </Skeleton>
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
                ) : (
                    <div className="col-12 col-lg-3">
                        <div className="profile-main section-blur">
                            <div className="profile-image p-4">
                                <img src={patient?.profileImage} alt="profile" />
                            </div>
                            <h4 className="title text-center">{patient?.name}</h4>

                            <div className="container-fluid px-0">

                                <div className="row profile-section px-4 pt-3 gx-3">
                                    <div className="col-12 col-md-6 col-lg-12">
                                        <h5>Basic Information</h5>

                                        <div className="container-fluid px-0 pb-3">
                                            <div className="row">
                                                <div className="profile-group col-12">
                                                    <li className="title">Date of Birth</li>
                                                    <li>{patient?.dateOfBirth}</li>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Age</li>
                                                    <li>{patient?.age}</li>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Gender</li>
                                                    <li>{patient?.gender == 0 ? 'Male' : 'Female'}</li>
                                                </div>

                                                <div className="profile-group col-12">
                                                    <li className="title">Address</li>
                                                    <li>{patient?.address}</li>
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
                                                    <li>{patient?.bloodGroup}</li>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Height</li>
                                                    <li>{patient?.height}</li>
                                                </div>

                                                <div className="profile-group col-6">
                                                    <li className="title">Weight</li>
                                                    <li>{patient?.weight}</li>
                                                </div>

                                                <div className="profile-group col-12">
                                                    <li className="title">Registered By</li>
                                                    <li>{patient?.admin.hospital?.name}</li>
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
                )
            }

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