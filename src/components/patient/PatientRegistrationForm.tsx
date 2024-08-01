import { Alert, Backdrop, CircularProgress, Collapse, IconButton } from '@mui/material';
import './PatientRegistrationForm.css';
import { FormEvent, useEffect, useState } from 'react';
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { Patient } from '../../models/Patient';

interface PatientForm {
    patientName: string; nic: string;
    dateOfBirth: string;
    gender: string; address: string;
    bloodGroup: string; height: string;
    weight: string; profileImage: File | null;
}

interface PatientFormValidationErrors {
    patientName: string | null; dateOfBirth?: string | null;
    gender?: string | null; bloodGroup?: string | null;
    height?: string | null; weight?: string | null;
    profileImage?: string | null; address: string | null;
    nic: string | null
}

interface PatientFormValidation {
    patientName: boolean; dateOfBirth: boolean;
    gender: boolean; bloodGroup: boolean;
    height: boolean; weight: boolean;
    profileImage: boolean; address: boolean;
    nic: boolean
}

interface PatientRegistrationFormProps {
    isEdit: boolean;
    patient?: Patient;
}

export function PatientRegistrationForm({ isEdit = false, patient }: PatientRegistrationFormProps) {
    const [open, setOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<"Success" | "Error">("Success");
    const [link, setLink] = useState<string>("");
    const [pForm, setPForm] = useState<PatientForm>(patient? {
        patientName: patient.name, dateOfBirth: patient.dateOfBirth, gender: patient.gender == 0? "Male" : "Female",
        address: patient.address, bloodGroup: patient.bloodGroup, height: patient.height.toString(), weight: patient.weight.toString(),
        profileImage: null, nic: patient.nic
    } : {
        patientName: "", dateOfBirth: "", gender: "Male",
        address: "", bloodGroup: "none", height: "138", weight: "56",
        profileImage: null, nic: ""
    });
    const [pFormErrors, setPFormErrors] = useState<PatientFormValidationErrors>({
        patientName: null, dateOfBirth: null, bloodGroup: null, height: null,
        weight: null, gender: null, address: null, nic: null
    });
    const [pFormValidation, setPFormValidation] = useState<PatientFormValidation>({
        patientName: false, dateOfBirth: false, bloodGroup: false, height: false, gender: false,
        weight: false, profileImage: false, address: false, nic: false
    });

    const openAlert = (type: "Success" | "Error", link?: string) => {
        setAlertType(type);
        setLink(link || "");
        setOpen(true);
    };

    const validatePatientName = () => {
        if (!pForm.patientName) {
            setPFormErrors((prev) => ({ ...prev, patientName: "Patient name is required" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, patientName: null }));
        return true;
    };

    const validateDateOfBirth = () => {
        if (pForm.dateOfBirth == "" || pForm.dateOfBirth == null) {
            setPFormErrors((prev) => ({ ...prev, dateOfBirth: "Birth date is required" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, dateOfBirth: null }));
        return true;
    };

    const validateGender = () => {
        if (!pForm.gender) {
            setPFormErrors((prev) => ({ ...prev, gender: "Gender is required" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, gender: null }));
        return true;
    };

    const validateBloodGroup = () => {
        if (pForm.bloodGroup == "" || pForm.bloodGroup == "none") {
            setPFormErrors((prev) => ({ ...prev, bloodGroup: "Blood group is required" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, bloodGroup: null }));
        return true;
    };

    const validateHeight = () => {
        if (!pForm.height) {
            setPFormErrors((prev) => ({ ...prev, height: "Height is required" }));
            return false;
        }
        if (!pForm.height.match(/^\d+(\.)?\d+$/)) {
            setPFormErrors((prev) => ({ ...prev, height: "Height should be a valid number in cm" }));
            return false;
        }

        let heightNum = Number.parseFloat(pForm.height);
        if (heightNum < 0 || heightNum > 200) {
            setPFormErrors((prev) => ({ ...prev, height: "Please enter a valid" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, height: null }));
        return true;
    };

    const validateWeight = () => {
        if (!pForm.weight) {
            setPFormErrors((prev) => ({ ...prev, weight: "Weight is required" }));
            return false;
        }
        if (!pForm.weight.match(/^\d+(\.)?\d+$/)) {
            setPFormErrors((prev) => ({ ...prev, weight: "Weight should be a valid number in Kg" }));
            return false;
        }

        let weightNum = Number.parseFloat(pForm.weight);
        if (weightNum <= 10 || weightNum >= 280) {
            setPFormErrors((prev) => ({ ...prev, weight: "Please enter a valid wight" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, weight: null }));
        return true;
    };

    const validateAddress = () => {
        if (pForm.address == "") {
            setPFormErrors((prev) => ({ ...prev, address: "Address is required" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, address: null }));
        return true;
    };

    const validateProfileImage = () => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (pForm.profileImage && !validTypes.includes(pForm.profileImage.type)) {
            setPFormErrors((prev) => ({ ...prev, profileImage: "File type not supported. Please upload a JPEG, PNG, or PDF file." }));
            return false;
        }

        setPFormErrors((prev) => ({ ...prev, profileImage: null }));
        return true;
    };

    const validateNicNumber = () => {
        if (pForm.nic == "") {
            setPFormErrors((prev) => ({ ...prev, nic: "NIC is required" }));
            return false;
        }
        if (! pForm.nic.match(/^\d{12}$/)) {
            setPFormErrors((prev) => ({ ...prev, nic: "Please enter a valid NIC number" }));
            return false;
        }
        setPFormErrors((prev) => ({ ...prev, nic: null }));
        return true;
    };

    // For form fields
    const genderOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPForm({ ...pForm, gender: e.target.value });
        setPFormValidation((prev) => ({ ...prev, gender: true }));
    };

    const photoOnChnage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setPForm({ ...pForm, profileImage: e.target.files[0] });
        }
        else {
            setPForm({ ...pForm, profileImage: null });
        }
    };

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const pn = validatePatientName();
        const pnc = validateNicNumber();
        const pd = validateDateOfBirth();
        const pg = validateGender();
        const pb = validateBloodGroup();
        const ph = validateHeight();
        const pw = validateWeight();
        const pa = validateAddress();
        const pi = validateProfileImage();

        if (!(pn && pnc && pd && pg && pb && ph && pw && pa && pi)) {
            return;
        }

        const patientData = new FormData();
        patientData.append("name", pForm.patientName);
        patientData.append("nic",pForm.nic);
        patientData.append("dateOfBirth", pForm.dateOfBirth);
        patientData.append("gender", pForm.gender);
        patientData.append("bloodGroup", pForm.bloodGroup);
        patientData.append("height", pForm.height);
        patientData.append("weight", pForm.weight);
        patientData.append("address", pForm.address);
        if (pForm.profileImage) patientData.append("profileImage", pForm.profileImage);

        // Make the api call
        if (isEdit) {
            try {
                const response = await axiosInstance.put(`/api/patient/${patient?.id}`, patientData);

                if (response.status == 200) {
                    console.log(response.data);
                    openAlert("Success", "/patient/2/overview");
                }
            } catch (error) {
                console.error(error);
                openAlert("Error");
            }
        } else {
            try {
                const response = await axiosInstance.post('/api/patient', patientData);

                if (response.status == 200) {
                    console.log(response.data);
                    openAlert("Success", "/patient/2/overview");
                }
            } catch (error) {
                console.error(error);
                openAlert("Error");
            }
        }
    };

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setOpen(false);
            }, 4000);
        }
    }, [open]);

    useEffect(() => { if (pFormValidation.patientName) validatePatientName() }, [pForm.patientName]);
    useEffect(() => { if (pFormValidation.dateOfBirth) validateDateOfBirth() }, [pForm.dateOfBirth]);
    useEffect(() => { if (pFormValidation.gender) validateGender() }, [pForm.gender]);
    useEffect(() => { if (pFormValidation.bloodGroup) validateBloodGroup() }, [pForm.bloodGroup]);
    useEffect(() => { if (pFormValidation.height) validateHeight() }, [pForm.height]);
    useEffect(() => { if (pFormValidation.weight) validateWeight() }, [pForm.weight]);
    useEffect(() => { if (pFormValidation.address) validateAddress() }, [pForm.address]);
    useEffect(() => {if(pFormValidation.nic) validateNicNumber()}, [pForm.nic]);
    useEffect(() => { validateProfileImage() }, [pForm.profileImage]);

    return (
        <>
            <div className='col-12'>
                <h2 className='mb-4'># Patient Registration</h2>
            </div>

            <div className="col-12">
                <Collapse in={open}>
                    <PatientAlert type={alertType} link={link} />
                </Collapse>
            </div>

            <div className="col-12">
                <div id="patient-form" className="section-blur">

                    <h4>Patient Registration Form</h4>

                    <form className="patient-form mt-3" onSubmit={onSubmit}>

                        <h6>Basic Information</h6>

                        <div className="row g-3 mb-4">

                            <div className="col-12 col-md-6">
                                <label htmlFor="inputName" className="form-label">Patient Full Name :</label>
                                <input type="text" className="form-control" id="inputName" value={pForm.patientName} onChange={(e) => {
                                    setPForm((prev) => ({ ...prev, patientName: e.target.value }));
                                    setPFormValidation((prev) => ({ ...prev, patientName: true }));
                                }} onBlur={() => validatePatientName()} />
                                <label htmlFor="inputName" className="form-label text-danger">{pFormErrors.patientName}</label>
                            </div>

                            <div className="col-12 col-md-6">
                                <label htmlFor="inputNIC" className="form-label">NIC Number :</label>
                                <input type="text" className="form-control" id="inputNIC" value={pForm.nic} onChange={(e) => {
                                    setPForm((prev) => ({ ...prev, nic: e.target.value }));
                                    setPFormValidation((prev) => ({ ...prev, nic: true }));
                                }} onBlur={() => validateNicNumber()} />
                                <label htmlFor="inputNIC" className="form-label text-danger">{pFormErrors.nic}</label>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="inputDob" className="form-label">Date of Birth</label>
                                <input type="date" className="form-control" id="inputDob" value={pForm.dateOfBirth} onChange={(e) => {
                                    setPForm((prev) => ({ ...prev, dateOfBirth: e.target.value }));
                                    setPFormValidation((prev) => ({ ...prev, dateOfBirth: true }));
                                }} onBlur={() => validateDateOfBirth()} />
                                <label htmlFor="inputDob" className="form-label text-danger">{pFormErrors.dateOfBirth}</label>
                            </div>

                            <div className="col-6">
                                <label htmlFor="gender" className="form-label">Gender :</label>
                                <div className="d-flex">

                                    <div className="form-check me-3">
                                        <input className="form-check-input" type="radio" id="gridCheck" name="gender" value="Male"
                                        checked={pForm.gender == "Male"} onChange={genderOnChange} />
                                        <label className="form-check-label" htmlFor="gridCheck">
                                            Male
                                        </label>
                                    </div>

                                    <div className="form-check me-3">
                                        <input className="form-check-input" type="radio" id="gridCheck2" name="gender" value="Female"
                                        checked={pForm.gender == "Female"} onChange={genderOnChange} />
                                        <label className="form-check-label" htmlFor="gridCheck2">
                                            Female
                                        </label>
                                    </div>

                                </div>
                                <label htmlFor="gender" className="form-label text-danger">{pFormErrors.gender}</label>
                            </div>

                            <div className="col-12">
                                <label htmlFor="inputAddress" className="form-label">Address</label>
                                <textarea name="address" id="inputAddress" className="form-control" value={pForm.address}
                                    onChange={(e) => {
                                        setPForm((prev) => ({ ...prev, address: e.target.value }));
                                        setPFormValidation((prev) => ({ ...prev, address: true }));
                                    }} onBlur={() => validateAddress()}></textarea>
                                <label htmlFor="inputAddress" className="form-label text-danger">{pFormErrors.address}</label>
                            </div>

                        </div>

                        <h6>Other Information</h6>

                        <div className="row g-3">

                            <div className="col-md-4">
                                <label htmlFor="inputBlood" className="form-label">Blood Group</label>
                                <select id="inputBlood" className="form-select" value={pForm.bloodGroup}
                                    onChange={(e) => {
                                        setPForm((prev) => ({ ...prev, bloodGroup: e.target.value }));
                                        setPFormValidation((prev) => ({ ...prev, bloodGroup: true }));
                                    }} onBlur={() => validateBloodGroup()}>
                                    <option disabled value="none">Choose...</option>
                                    <option value="A+">A positive</option>
                                    <option value="A-">A negative</option>
                                    <option value="B+">B positive</option>
                                    <option value="B-">B negative</option>
                                </select>
                                <label htmlFor="inputBlood" className="form-label text-danger">{pFormErrors.bloodGroup}</label>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="inputHeight" className="form-label">Height :</label>
                                <input type="number" className="form-control" id="inputHeight" value={pForm.height}
                                    onChange={(e) => {
                                        setPForm((prev) => ({ ...prev, height: e.target.value }));
                                        setPFormValidation((prev) => ({ ...prev, height: true }));
                                    }} onBlur={() => validateHeight()} />
                                <label htmlFor="inputHeight" className="form-label text-danger">{pFormErrors.height}</label>
                            </div>

                            <div className="col-md-4">
                                <label htmlFor="inputWeight" className="form-label">Weight :</label>
                                <input type="number" className="form-control" id="inputWeight" value={pForm.weight}
                                    onChange={(e) => {
                                        setPForm((prev) => ({ ...prev, weight: e.target.value }));
                                        setPFormValidation((prev) => ({ ...prev, weight: true }));
                                    }} onBlur={() => validateWeight()} />
                                <label htmlFor="inputWeight" className="form-label text-danger">{pFormErrors.weight}</label>
                            </div>

                            <div className="col-12">
                                <label htmlFor="inputImage" className='form-label'>Profile Photo</label>
                                <input type="file" name="profile" id="inputImage" className='form-control' onChange={photoOnChnage} />
                                <label htmlFor="inputImage" className='form-label text-danger'>{pFormErrors.profileImage}</label>
                            </div>

                            <div className="col-12 controls">
                                <button type="submit" id="register-btn" className="my-3 me-2">
                                    <span className="me-2 text-nowrap">Register Patient</span>
                                    <span className="material-symbols-outlined">
                                        how_to_reg
                                    </span>
                                </button>

                                <button type="button" id="cancel-btn">
                                    <span className="me-2">Cancel</span>
                                    <span className="material-symbols-outlined">
                                        cancel
                                    </span>
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </>
    );
}

export function PatientEditForm() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const patientId = searchParams.get("id");
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        //console.log(patientId);
        if (!patientId) navigate("/404");
        const fetchPatient = async () => {
            try {
                const response = await axiosInstance.get(`/api/patient/${patientId}`);

                if (response.status == 200 && response.data) {
                    setPatient(response.data);
                } else {
                    navigate("/404");
                }
            } catch (error) {
                console.log(error);
                navigate("/404");
            }
        };

        fetchPatient();
    });

    return (patient ? (
        <PatientRegistrationForm isEdit={true} patient={patient} />
    ) : (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
    );
}

interface PatientAlertProps {
    type: "Success" | "Error";
    link?: string;
}

function PatientAlert({ type, link }: PatientAlertProps) {

    return (
        type == "Success" ? (
            <Alert className='section-blur success-alert' severity="success"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                    >
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                Patient Registered Successfully! You can view his/her profile from <NavLink to={link || ""}>Here.</NavLink>
            </Alert>
        ) : (
            <Alert className='section-blur error-alert' severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                    >
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                Something went wrong! Couldn't register patient. Please contact your institute administer.
            </Alert>
        )
    );
}