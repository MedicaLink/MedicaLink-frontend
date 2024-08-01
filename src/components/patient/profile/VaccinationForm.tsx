import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from "react";
import { Vaccination } from "../../../models/Vaccination";
import { useParams } from "react-router-dom";
import { Vaccine } from "../../../models/Vaccine";
import { VaccineBrand } from "../../../models/VaccineBrand";
import axiosInstance from "../../../axiosInstance";
import { AlertType, useAlertSnack } from "../../AlertSnack";
import { UseUser } from "../../auth/UserContext";

export function VaccinationForm({ vaccination, onRefresh }: VaccinationFormProps) {
    const [formNode, setFormNode] = useState<ReactNode>(<VaccinationOverviewForm vaccination={vaccination}/>);
    const { user } = UseUser();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <div className="container-fluid mt-3 px-0">
            <h4 className="mt-3 mt-md-0">Vaccination Details - 20/12/2003</h4>
            {
                vaccination?.isEditable ? (
                    isEdit ? (
                        <div className="d-flex my-3 mt-md-0 cancel-btn-container">
                            <button className="cancel-btn shadow" id="cancel-btn" onClick={() => {
                                setIsEdit(false);
                                setFormNode(<VaccinationOverviewForm vaccination={vaccination}/>);
                            }}>
                                <span className="me-2">Cancel</span>
                                <span className="material-symbols-outlined">
                                    close
                                </span>
                            </button>
                        </div>
                    ) : (
                        <div className="d-flex mt-3 mt-md-0 edit-btn-container">
                            {
                                user?.role == "Admin"? (
                                    <button className="edit-btn shadow" id="edit-btn" onClick={() => {
                                        setIsEdit(true);
                                        setFormNode(<VaccinationEditForm vaccination={vaccination} onRefresh={onRefresh}/>);
                                    }}>
                                        <span className="me-2">Edit Record</span>
                                        <span className="material-symbols-outlined">
                                            edit_note
                                        </span>
                                    </button>
                                ) : null
                            }
                        </div>
                    )
                ) : null
            }

            {formNode}
        </div>
    )
}

function VaccinationOverviewForm({vaccination}:VaccinationFormProps) {
    return (
        <div className="row gx-0">

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Vaccine Name :</span>
                    <span className="value">{vaccination?.vaccineBrand?.vaccine.name}</span>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Vaccine Brand :</span>
                    <span className="value">{vaccination?.vaccineBrand?.brandName}</span>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Vaccinated Location :</span>
                    <span className="value">{vaccination?.hospital?.name}</span>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Dose :</span>
                    <span className="value">{vaccination?.dose}</span>
                </div>
            </div>

            <div className="col-12">
                <div className="record">
                    <span className="title">Description :</span>
                    <p className="value">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Recusandae id possimus laudantium quam impedit.
                        Nobis blanditiis qui temporibus voluptatum quos?
                    </p>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Created On :</span>
                    <span className="value">{vaccination?.dateOfVaccination}</span>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Last Updated :</span>
                    <span className="value">12/06/2003</span>
                </div>
            </div>

        </div>
    );
}

function VaccinationEditForm({ vaccination, onRefresh }: VaccinationFormProps) {
    const [vaccineBrand, setVaccineBrand] = useState<number | string | undefined>("");
    const [vaccine, setVaccine] = useState<number | string | undefined>("");
    const [date, setDate] = useState(vaccination?.dateOfVaccination);
    const [dose, setDose] = useState(vaccination?.dose);
    const [description, setDescription] = useState("");
    const [vaccineBrandError, setVaccineBrandError] = useState<string | null>("");
    const [vaccineError, setVaccineError] = useState<string | null>("");
    const [dateError, setDateError] = useState<string | null>("");
    const [doseError, setDoseError] = useState<string | null>("");
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [vaccineBrands, setVaccineBrands] = useState<VaccineBrand[]>([]);
    const [vForm,setVForm] = useState<VForm>({
        vaccineBrand: false, vaccine: false,date: false, dose: false, description: false
    });
    const {showAlert} = useAlertSnack();

    const setVaccineDynamicBrands = () => {
        for (let v of vaccines) {
            if (v.id.toString() == vaccine) {
                setVaccineBrands(v.vaccineBrands);
                console.log(vaccineBrands);
            }
        }
    }

    const onVaccineSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const vaccineId = e.target.value;

        setVaccine(vaccineId);
        setVaccineDynamicBrands();
    }

    const validateBrand = (): boolean => {

        if (vaccineBrand == "" || vaccineBrand == "none") {
            setVaccineBrandError("Brand is required");
            return false;
        }

        setVaccineBrandError(null);
        return true;
    }

    const validateVaccine = (): boolean => {
        if (vaccine == "" || vaccine == "none") {
            setVaccineError("Vaccine is required");
            return false;
        }

        setVaccineError(null);
        return true;
    }

    const validateDate = (): boolean => {
        if (date == "" || date == null) {
            setDateError("Date is required");
            return false;
        }

        setDateError(null);
        return true;
    }

    const validateDose = (): boolean => {
        if (dose == "") {
            setDoseError("Dose is required");
            return false;
        }

        setDoseError(null);
        return true;
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const v = validateVaccine();
        const vb = validateBrand();
        const d = validateDate();
        const vd = validateDose();

        if (!(v && vb && d && vd)) return;

        // Make the api request
        const updatedVaccination: Vaccination = {
            id: vaccination?.id || 0, dose: dose || "", patientId: vaccination?.patientId || 0,
            dateOfVaccination: date || "", vaccineBrandId: vaccineBrand || 0, hospitalId: 0,
            isEditable: true
        };

        console.log(updatedVaccination);
        try{
            let response = await axiosInstance.put(`/api/vaccinations/${updatedVaccination.id}`,updatedVaccination);

            if(response.status == 200){
                console.log(response.data);
                showAlert("Success","Vaccination details updated successfully",AlertType.success);
                if(onRefresh) onRefresh();
            }
        }catch(error){
            console.error(error);
            showAlert("Error","Couldn't update vaccination",AlertType.error);
        }
    };

    useEffect(() => {
        const fetchVaccines = async () => {
            //console.log(vaccination);
            try {
                let response = await axiosInstance.get("/api/vaccine");

                if (response.data) {
                    setVaccines(response.data);
                    setVaccine(vaccination?.vaccineBrand?.vaccine.id);
                }
            } catch (error) {
                console.error(error);
                // Show error alert snack
            }
        };

        fetchVaccines();
    }, []);

    useEffect(() => {
        if (vaccine) {
            setVaccineDynamicBrands();
            setVaccineBrand(vaccination?.vaccineBrand?.id);
        }
    }, [vaccine]);

    useEffect(() => { if(vForm.vaccineBrand) validateBrand()}, [vaccineBrand]);
    useEffect(() => { if(vForm.vaccine) validateVaccine()}, [vaccine]);
    useEffect(() => { if(vForm.date) validateDate()}, [date]);
    useEffect(() => { if(vForm.dose) validateDose()}, [dose]);

    return (
        <form className="row g-3 mx-0" onSubmit={onSubmit}>

            <div className="col-12 col-md-6">
                <label htmlFor="vaccineName" className="form-label">Vaccine</label>
                <select id="vaccineName" className="form-select" value={vaccine} onChange={onVaccineSelect}>
                    <option disabled>Select Vaccine</option>
                    {
                        vaccines.map(v => {
                            return <option value={v.id} key={v.id}>{v.name}</option>;
                        })
                    }

                </select>
                <label htmlFor="vaccineName" className="form-label text-danger">{vaccineError}</label>
            </div>

            <div className="col-12 col-md-6">
                <label htmlFor="vaccineBrand" className="form-label">Vaccine Brand</label>
                <select id="vaccineBrand" className="form-select" value={vaccineBrand} onChange={(e) => {
                    setVaccineBrand(e.target.value);
                    setVForm((previousValues) => {
                        return { ...previousValues, vaccineBrand: true };
                    });
                }}>
                    <option disabled>Select Vaccine Brand</option>
                    {
                        vaccineBrands.map(vb => {
                            return <option value={vb.id} key={vb.id}>{vb.brandName}</option>;
                        })
                    }

                </select>
                <label htmlFor="vaccineBrand" className="form-label text-danger">{vaccineBrandError}</label>
            </div>

            <div className="col-12 col-md-6">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="date" className="form-control" id="date" name="date_administered" value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setVForm((previousValues) => {
                            return { ...previousValues, date: true };
                        });
                    }} />
                <label htmlFor="date" className="form-label text-danger">{dateError}</label>
            </div>

            <div className="col-12 col-md-6">
                <label htmlFor="dose" className="form-label">Dose</label>
                <input type="text" className="form-control" name="dose" id="dose" value={dose}
                    onChange={(e) => {
                        setDose(e.target.value);
                        setVForm((previousValues) => {
                            return { ...previousValues, dose: true };
                        });
                    }} />
                <label htmlFor="dose" className="form-label text-danger">{doseError}</label>
            </div>

            <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" name="description" className="form-control"
                    onChange={(e) => { setDescription(e.target.value) }} value={description}>
                </textarea>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary">Save Record</button>
            </div>

        </form>
    )
}

interface VaccinationFormProps {
    isEdit?: boolean;
    vaccination?: Vaccination;
    onRefresh?: () => void;
}

interface VForm{
    vaccineBrand: boolean;
    vaccine: boolean;
    date: boolean;
    dose: boolean;
    description: boolean;
}

export function VaccinationInsertForm({onRefresh} : VaccinationFormProps) {
    const { patientId } = useParams();
    const [vaccineBrand, setVaccineBrand] = useState<number | string | undefined>("none");
    const [vaccine, setVaccine] = useState<number | string | undefined>("none");
    const [date, setDate] = useState("");
    const [dose, setDose] = useState("");
    const [description, setDescription] = useState("");
    const [vaccineBrandError, setVaccineBrandError] = useState<string | null>(null);
    const [vaccineError, setVaccineError] = useState<string | null>(null);
    const [dateError, setDateError] = useState<string | null>(null);
    const [doseError, setDoseError] = useState<string | null>(null);
    const [vaccines, setVaccines] = useState<Vaccine[]>([]);
    const [vaccineBrands, setVaccineBrands] = useState<VaccineBrand[]>([]);
    const [vForm,setVForm] = useState<VForm>({
        vaccineBrand: false, vaccine: false,date: false, dose: false, description: false
    });
    const {showAlert} = useAlertSnack();

    const onVaccineSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const vaccineId = e.target.value;
        setVaccine(vaccineId);
        setVForm((previousValues) => {
            return { ...previousValues, vaccine: true };
        });
    }

    const validateBrand = (): boolean => {

        if (vaccineBrand == "" || vaccineBrand == "none") {
            setVaccineBrandError("Brand is required");
            return false;
        }

        setVaccineBrandError(null);
        return true;
    }

    const validateVaccine = (): boolean => {
        if (vaccine == "" || vaccine == "none") {
            setVaccineError("Vaccine is required");
            return false;
        }

        setVaccineError(null);
        return true;
    }

    const validateDate = (): boolean => {
        if (date == "" || date == null) {
            setDateError("Date is required");
            return false;
        }

        setDateError(null);
        return true;
    }

    const validateDose = (): boolean => {
        if (dose == "") {
            setDoseError("Dose is required");
            return false;
        }

        setDoseError(null);
        return true;
    }

    useEffect(() => {
        const fetchVaccines = async () => {
            //console.log(vaccination);
            try {
                let response = await axiosInstance.get("/api/vaccine");

                if (response.data) {
                    setVaccines(response.data);
                }
            } catch (error) {
                console.error(error);
                // Show error alert snack
            }
        };

        fetchVaccines();
    }, []);

    useEffect(() => {
        const setVaccineDynamicBrands = () => {
            for (let v of vaccines) {
                if (v.id == vaccine) {
                    setVaccineBrands(v.vaccineBrands);
                }
            }
        };

        setVaccineDynamicBrands();
    },[vaccine]);

    useEffect(() => { if(vForm.vaccineBrand) validateBrand()}, [vaccineBrand]);
    useEffect(() => { if(vForm.vaccine) validateVaccine()}, [vaccine]);
    useEffect(() => { if(vForm.date) validateDate()}, [date]);
    useEffect(() => { if(vForm.dose) validateDose()}, [dose]);

    // Form submition
    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const v = validateVaccine();
        const vb = validateBrand();
        const d = validateDate();
        const vd = validateDose();

        if (!(v && vb && d && vd)) return;

        // Make the api request
        const newVaccination: Vaccination = {
            id: 0, dose: dose || "", patientId: patientId || 0, dateOfVaccination: date || "",
            vaccineBrandId: vaccineBrand || 0, hospitalId: 0, isEditable: true
        };

        try{
            let response = await axiosInstance.post("/api/vaccinations",newVaccination);

            if(response.status == 200){
                console.log(response.data);
                showAlert("Success","Vaccination details saved successfully",AlertType.success);
                if(onRefresh) onRefresh();
            }
        }catch(error){
            console.error(error);
            showAlert("Error","Couldn't save vaccination",AlertType.error);
        }
    };

    return (
        <>
            <h4 className="mt-3 mt-md-0">Vaccination Details - 20/12/2003</h4>

            <form className="row g-3 mx-0 mt-5" onSubmit={onSubmit}>

                <div className="col-12 col-md-6">
                    <label htmlFor="vaccineNames" className="form-label">Vaccine Brand</label>
                    <select id="vaccineNames" className="form-select" value={vaccine} onChange={onVaccineSelect}>
                        <option disabled value="none">Select Vaccine</option>

                        {
                            vaccines.map(v => {
                                return <option value={v.id} key={v.id}>{v.name}</option>;
                            })
                        }
                    </select>
                    <label htmlFor="vaccineNames" className="form-label text-danger">{vaccineError}</label>
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="vaccineBrand" className="form-label">Vaccine Name</label>
                    <select id="vaccineBrand" className="form-select" name="vaccine_id" value={vaccineBrand} onChange={(e) => {
                        setVaccineBrand(e.target.value);
                        setVForm((previousValues) => {
                            return { ...previousValues, vaccineBrand: true };
                        });
                    }}>
                        <option disabled value="none">Select Vaccine Brand</option>

                        {
                            vaccineBrands.map(vb => {
                                return <option value={vb.id} key={vb.id}>{vb.brandName}</option>;
                            })
                        }
                    </select>
                    <label htmlFor="vaccineBrand" className="form-label text-danger">{vaccineBrandError}</label>
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date_administered" value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setVForm((previousValues) => {
                                return { ...previousValues, date: true };
                            });
                        }}/>
                    <label htmlFor="date" className="form-label text-danger">{dateError}</label>
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="dose" className="form-label">Dose</label>
                    <input type="text" className="form-control" name="dose" id="dose" value={dose}
                        onChange={(e) => {
                            setDose(e.target.value);
                            setVForm((previousValues) => {
                                return { ...previousValues, dose: true };
                            });
                        }}/>
                    <label htmlFor="dose" className="form-label text-danger">{doseError}</label>
                </div>

                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" name="description" className="form-control"
                        onChange={(e) => { setDescription(e.target.value) }} value={description}>
                    </textarea>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save Record</button>
                </div>

            </form>
        </>
    );
}