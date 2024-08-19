import { FormEvent, ReactNode, useEffect, useState } from 'react';
import { MedicalRecord } from '../../../models/MedicalRecord';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';
import { AlertType, useAlertSnack } from '../../AlertSnack';
import { UseUser } from '../../auth/UserContext';
import recordImage from '../../../assets/img/record.png';
import { Blurhash } from 'react-blurhash';
import LazyLoad from 'react-lazyload';


interface RecordFormProps {
    record?: MedicalRecord;
    isEdit?: boolean,
    onRefresh?: () => void;
}

export function RecordForm({ record, onRefresh }: RecordFormProps) {
    const [formNode, setFormNode] = useState<ReactNode>(<RecordOverviewForm record={record} />);
    const { user } = UseUser();
    const [isEdit, setIsEdit] = useState<boolean>(false);

    return (
        <div className="container-fluid mt-3 px-0">
            <h4 className="mt-3 mt-md-0">Medical Record Details{record?.recordType} - 20/12/2003</h4>

            {
                record?.isEditable ? (
                    isEdit ? (
                        <div className="d-flex my-3 mt-md-0 cancel-btn-container">
                            <button className="cancel-btn shadow" id="cancel-btn" onClick={() => {
                                setIsEdit(false);
                                setFormNode(<RecordOverviewForm record={record} />);
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
                                user?.role == "Admin" ? (
                                    <button className="edit-btn shadow" id="edit-btn" onClick={() => {
                                        setIsEdit(true);
                                        setFormNode(<RecordEditForm record={record} onRefresh={onRefresh} />);
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

function RecordOverviewForm({ record }: RecordFormProps) {
    const [isRecordLoaded, setIsRecordLoaded] = useState<boolean>(false);

    return (
        <div className="row gx-0">

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Record Type :</span>
                    <span className="value">{record?.recordType}</span>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Medical Institute :</span>
                    <span className="value">{record?.admin.hospital?.name}</span>
                </div>
            </div>

            <div className="col-12">
                <div className="record">
                    <span className="title">Notes / Description :</span>
                    <p className="value">
                        {record?.description ||
                            'Blood test was done to prepare for upcoming septoplasty. He seems to be very healthy and fit.'}
                    </p>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Created On :</span>
                    <span className="value">{record?.date}</span>
                </div>
            </div>

            <div className="col-12 col-md-6">
                <div className="record">
                    <span className="title">Last Updated :</span>
                    <span className="value">{record?.date}</span>
                </div>
            </div>

            <div className="py-5 col-12 d-flex flex-wrap justify-content-start">

                <div className='border border-1 record-image-container'>
                    <LazyLoad height={500} offset={100} once>
                        {isRecordLoaded || <Blurhash hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" width={600} height={500} />}
                        <img src={recordImage} alt="record-image" 
                        className={`record-image ${!isRecordLoaded? 'd-none': ''}`} 
                        />
                    </LazyLoad>
                </div>

                <div className="record pt-0 ps-4">
                    <span className="title">Attachment :</span>
                    <span className="value">
                        <a href={recordImage} target='_blank' download>Download report</a>
                    </span>
                </div>

            </div>

        </div>
    );
}

interface RForm {
    recordType: boolean;
    date: boolean;
}

function RecordEditForm({ record, onRefresh }: RecordFormProps) {
    const [recordType, setRecordType] = useState(record?.recordType);
    const [date, setDate] = useState(record?.date);
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [recordTypeError, setRecordTypeError] = useState<String | null>(null);
    const [dateError, setDateError] = useState<String | null>(null);
    const [fileError, setFileError] = useState<String | null>(null);
    const [rForm, setRForm] = useState<RForm>({
        recordType: false, date: false
    });
    const { showAlert } = useAlertSnack();

    const validateRecordType = () => {
        if (!recordType) {
            setRecordTypeError("Record type is required");
            return false;
        }

        setRecordTypeError(null);
        return true;
    };

    const validateDate = () => {
        if (!date) {
            setDateError("Date is required");
            return false;
        }

        setDateError(null);
        return true;
    };

    const validateFile = () => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (file && !validTypes.includes(file.type)) {
            setFileError("File type not supported. Please upload a JPEG, PNG, or PDF file.");
            return false;
        }

        setFileError(null);
        return true;
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const rt = validateRecordType();
        const d = validateDate();
        const f = validateFile();
        if (!(rt && d && f)) {
            return;
        }

        const recordData = new FormData();
        recordData.append("recordType", recordType || "");
        recordData.append("date", date || "");
        recordData.append("description", description);
        if (file) recordData.append("file", file);

        // Make the Update API call
        try {
            let response = await axiosInstance.put(`/api/medicalRecord/${record?.id}`, recordData);

            if (response.status == 200) {
                console.log(response.data);
                showAlert("Success", "Vaccination details saved successfully", AlertType.success);
                if (onRefresh) onRefresh();
            }
        } catch (error) {
            console.error(error);
            showAlert("Error", "Couldn't save vaccination", AlertType.error);
        }
    }

    useEffect(() => { if (rForm.recordType) validateRecordType() }, [recordType]);
    useEffect(() => { if (rForm.date) validateDate() }, [date]);
    useEffect(() => { validateFile() }, [file]);

    return (
        <form className="row g-3 mx-0" onSubmit={onSubmit}>

            <div className="col-12 col-md-6">
                <label htmlFor="recordType" className="form-label">Record Type</label>
                <input type="text" className="form-control" id="recordType" name="record_type" value={recordType}
                    onChange={(e) => {
                        setRecordType(e.target.value);
                        setRForm((previousValues) => {
                            return { ...previousValues, recordType: true };
                        });
                    }} />
                <label htmlFor="recordType" className="form-label text-danger">{recordTypeError}</label>
            </div>

            <div className="col-12 col-md-6">
                <label htmlFor="location" className="form-label">Location</label>
                <input type="text" className="form-control" id="location" value={record?.admin.hospital?.name} disabled />
            </div>

            <div className="col-12 col-md-6">
                <label htmlFor="date" className="form-label">Date</label>
                <input type="date" className="form-control" id="date" name="date_administered" value={date}
                    onChange={(e) => {
                        setDate(e.target.value);
                        setRForm((previousValues) => {
                            return { ...previousValues, date: true };
                        });
                    }} />
                <label htmlFor="date" className="form-label text-danger">{dateError}</label>
            </div>

            <div className="col-12">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea id="description" name="description" className="form-control"
                    onChange={(e) => setDescription(e.target.value)} value={description}>
                </textarea>
            </div>

            <div className="col-12">
                <label htmlFor="fileInput" className="form-label">Attachment</label>
                <input type="file" id="fileInput" name="file" className="form-control" onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setFile(e.target.files[0]);
                    }
                }} />
                <label htmlFor="fileInput" className="form-label text-danger">{fileError}</label>
            </div>

            <div className="col-12">
                <button type="submit" className="btn btn-primary">Save Record</button>
            </div>

        </form>
    )
}

export function RecordInsertForm({ onRefresh }: RecordFormProps) {
    const { patientId } = useParams();
    const [recordType, setRecordType] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [recordTypeError, setRecordTypeError] = useState<String | null>(null);
    const [dateError, setDateError] = useState<String | null>(null);
    const [fileError, setFileError] = useState<String | null>(null);
    const [rForm, setRForm] = useState<RForm>({
        recordType: false, date: false
    });
    const { showAlert } = useAlertSnack();

    const validateRecordType = () => {
        if (!recordType) {
            setRecordTypeError("Record type is required");
            return false;
        }

        setRecordTypeError(null);
        return true;
    };

    const validateDate = () => {
        if (!date) {
            setDateError("Date is required");
            return false;
        }

        setDateError(null);
        return true;
    };

    const validateFile = () => {
        const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        if (file && !validTypes.includes(file.type)) {
            setFileError("File type not supported. Please upload a JPEG, PNG, or PDF file.");
            return false;
        }

        setFileError(null);
        return true;
    }

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const rt = validateRecordType();
        const d = validateDate();
        const f = validateFile();
        if (!(rt && d && f)) {
            return;
        }

        const recordData = new FormData();
        recordData.append("patientId", patientId || '0');
        recordData.append("recordType", recordType || "");
        recordData.append("date", date || "");
        recordData.append("description", description);
        //if (file) recordData.append("file", file);

        // Make the Insert API call
        try {
            let response = await axiosInstance.post("/api/medicalRecord", recordData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status == 200) {
                console.log(response.data);
                showAlert("Success", "Vaccination details saved successfully", AlertType.success);
                if (onRefresh) onRefresh();
            }
        } catch (error) {
            console.error(error);
            showAlert("Error", "Couldn't save vaccination", AlertType.error);
        }
    };

    useEffect(() => { if (rForm.recordType) validateRecordType() }, [recordType]);
    useEffect(() => { if (rForm.date) validateDate() }, [date]);
    useEffect(() => { validateFile() }, [file]);

    return (
        <>
            <h4 className="mt-3 mt-md-0">Medical Record Details - 20/12/2003</h4>

            <form className="row g-3 mx-0 mt-5" onSubmit={onSubmit}>

                <div className="col-12 col-md-6">
                    <label htmlFor="recordType" className="form-label">Record Type</label>
                    <input type="text" className="form-control" id="recordType" name="record_type" value={recordType}
                        onChange={(e) => {
                            setRecordType(e.target.value);
                            setRForm((previousValues) => {
                                return { ...previousValues, recordType: true };
                            });
                        }} />
                    <label htmlFor="recordType" className="form-label text-danger">{recordTypeError}</label>
                </div>

                <div className="col-12 col-md-6">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input type="date" className="form-control" id="date" name="date_administered" value={date}
                        onChange={(e) => {
                            setDate(e.target.value);
                            setRForm((previousValues) => {
                                return { ...previousValues, date: true };
                            });
                        }} />
                    <label htmlFor="date" className="form-label text-danger">{dateError}</label>
                </div>

                <div className="col-12">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea id="description" name="description" className="form-control"
                        onChange={(e) => setDescription(e.target.value)} value={description}>
                    </textarea>
                </div>

                <div className="col-12">
                    <label htmlFor="fileInput" className="form-label">Attachment</label>
                    <input type="file" id="fileInput" name="file" className="form-control" onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                        }
                    }} />
                    <label htmlFor="fileInput" className="form-label text-danger">{fileError}</label>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save Record</button>
                </div>

            </form>
        </>
    );
}