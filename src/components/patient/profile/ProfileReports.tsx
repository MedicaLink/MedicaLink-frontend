import { ClipboardPulse, Virus2 } from 'react-bootstrap-icons';
import { NavLink, Outlet} from 'react-router-dom';
// import { NavLink, Outlet, useParams } from 'react-router-dom';
import Searchbar, { FilterCategory, FilterGroup, FilterList, FilterTitle, SearchFilter } from '../../search/Searchbar';
import { usePopup } from '../../popup/Popup';
import { VaccinationForm } from './VaccinationForm';
import './ProfileReports.css';
import { RecordForm, RecordEditForm } from './RecordForm';

interface Vaccination {
    id: number;
    type: string;
    brand: string;
    location: string;
    date: string;
    dose: string;
}

interface MedicalRecord {
    id: number;
    type: string;
    location: string;
    date: string;
}

interface AllergyRecord {
    id: number;
    type: string;
}

export function MedicalRecordsTable() {
    const { openPopup } = usePopup();

    const medicalRecords : MedicalRecord[] = [
        {id: 1, type:'Diagnosis', location: 'Hemas Hospitals', date:'10/06/2024'},
        {id: 2, type:'Diagnosis', location: 'Hemas Hospitals', date:'10/06/2024'},
        {id: 3, type:'Diagnosis', location: 'Hemas Hospitals', date:'10/06/2024'},
        {id: 4, type:'Diagnosis', location: 'Hemas Hospitals', date:'10/06/2024'}
    ];

    const handleClick = () => {
        openPopup(<RecordForm/>);
    }

    return (
        <>
            <div className="d-flex align-items-center" id="result-titles">
                <h5 className="mb-0">Medical Reports</h5>
                <div className="ms-auto d-flex align-items-center">
                    <span className="me-2 me-md-3 text-nowrap">Showing <span className="result-count">10</span> results</span>
                    <button className="add-btn" onClick={() => {
                        openPopup(<RecordEditForm/>);
                    }}>
                        <span className="me-2 d-none d-md-block">Add Record</span>
                        <span className="material-symbols-outlined">
                            note_add
                        </span>
                    </button>
                </div>
            </div>

            <div className="table-container mt-2 py-2 px-md-4">
                <table className="table mt-md-2 mb-0">
                    <thead>
                        <tr>
                            <th scope="col" className="d-none d-lg-table-cell">#</th>
                            <th scope="col">Report Type</th>
                            <th scope="col" className="d-none d-md-table-cell">Medical Institution</th>
                            <th scope="col">Date</th>
                            <th scope="col" className="d-none d-lg-table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            medicalRecords.map((medicalRecord : MedicalRecord) => {
                                return (
                                    <tr key={medicalRecord.id}>
                                        <th scope="row" className="d-none d-lg-table-cell">22 : 25</th>
                                        <td>{medicalRecord.type}</td>
                                        <td className="d-none d-md-table-cell">{medicalRecord.location}</td>
                                        <td>{medicalRecord.date}</td>
                                        <td className="d-none d-lg-table-cell">
                                            <div className="d-none d-lg-flex justify-content-end align-items-center">
                                                <button className="view-more" onClick={handleClick}>
                                                    <span className="material-symbols-outlined">
                                                        read_more
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="result-nav my-4" id="result-navigation">
                <button>
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>
                <div className="numbers">
                    <div className="active">1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
                <button>
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>
        </>
    );
}

export function VaccinationTable() {
    const { openPopup } = usePopup();

    const vaccinations: Vaccination[] = [
        { id: 1, type: 'BCG', brand: 'TheraCys® BCG', location: 'Nawaloka Hospitals', date: '12/06/2003', dose: '1st Dose' },
        { id: 2, type: 'BCG', brand: 'TheraCys® BCG', location: 'Nawaloka Hospitals', date: '12/06/2003', dose: '2nd Dose' },
        { id: 3, type: 'BCG', brand: 'TheraCys® BCG', location: 'Nawaloka Hospitals', date: '12/06/2003', dose: '3rd Dose' },
        { id: 4, type: 'BCG', brand: 'TheraCys® BCG', location: 'Nawaloka Hospitals', date: '12/06/2003', dose: '4th Dose' }
    ];

    const handleClick = () => {
        openPopup(<VaccinationForm/>);
    }

    return (
        <>

            <div className="d-flex align-items-center" id="result-titles">
                <h5 className="mb-0">Vaccination Details</h5>
                <div className="ms-auto d-flex align-items-center">
                    <span className="me-2 me-md-3 text-nowrap">Showing <span className="result-count">10</span> results</span>
                    <button className="add-btn">
                        <span className="me-2 d-none d-md-block">Add Vaccination</span>
                        <span className="material-symbols-outlined">
                            note_add
                        </span>
                    </button>
                </div>
            </div>

            <div className="table-container mt-2 py-2 px-md-4">
                <table className="table mt-md-2 mb-0">
                    <thead>
                        <tr>
                            <th scope="col" className="d-none d-lg-table-cell">#</th>
                            <th scope="col">Vaccine Type</th>
                            <th scope="col" className="d-none d-md-table-cell">Brand</th>
                            <th scope="col">Location</th>
                            <th scope="col">Date</th>
                            <th scope="col" className="d-none d-md-table-cell">Dose</th>
                            <th scope="col" className="d-none d-lg-table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            vaccinations.map((vaccination: Vaccination) => {
                                return (
                                    <tr key={vaccination.id}>
                                        <th scope="row" className="d-none d-lg-table-cell">22 : 25</th>
                                        <td>{vaccination.type}</td>
                                        <td className="d-none d-md-table-cell">{vaccination.brand}</td>
                                        <td>{vaccination.location}</td>
                                        <td>{vaccination.date}</td>
                                        <td className="d-none d-md-table-cell">{vaccination.dose}</td>
                                        <td className="d-none d-lg-table-cell">
                                            <div className="d-none d-lg-flex justify-content-end align-items-center">
                                                <button className="view-more" onClick={handleClick}>
                                                    <span className="material-symbols-outlined">
                                                        read_more
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="result-nav my-4" id="result-navigation">
                <button>
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>
                <div className="numbers">
                    <div className="active">1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
                <button>
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>

        </>
    );
}


export function AllergyReactionsTable() {
    const { openPopup } = usePopup();

    const allergy: AllergyRecord[] = [
        { id: 1, type: 'Drug Allergies'},
        { id: 2, type: 'Food Allergies'},
        { id: 3, type: 'Plaster Allergies'},
        { id: 4, type: 'BCG'}
    ];

    const handleClick = () => {
        openPopup(<VaccinationForm/>);
    }

    return (
        <>

            <div className="d-flex align-items-center" id="result-titles">
                <h5 className="mb-0">Allergies & Reactions</h5>
                <div className="ms-auto d-flex align-items-center">
                    <span className="me-2 me-md-3 text-nowrap">Showing <span className="result-count">10</span> results</span>
                    <button className="add-btn">
                        <span className="me-2 d-none d-md-block">Add Note</span>
                        <span className="material-symbols-outlined">
                            note_add
                        </span>
                    </button>
                </div>
            </div>

            <div className="table-container mt-2 py-2 px-md-4">
                <table className="table mt-md-2 mb-0">
                    <thead>
                        <tr>
                            <th scope="col" className="d-none d-lg-table-cell">#</th>
                            <th scope="col">Allergy Type</th>
                            <th scope="col" className="d-none d-md-table-cell"></th>
                            <th scope="col"></th>
                            <th scope="col">Date</th>
                            <th scope="col" className="d-none d-md-table-cell">Dose</th>
                            <th scope="col" className="d-none d-lg-table-cell"></th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            allergy.map((allergies: AllergyRecord) => {
                                return (
                                    <tr key={allergies.id}>
                                        <th scope="row" className="d-none d-lg-table-cell">22 : 25</th>
                                        <td>{allergies.type}</td>
                                        <td className="d-none d-md-table-cell">{allergies.brand}</td>
                                        <td>{allergies.location}</td>
                                        <td>{allergies.date}</td>
                                        <td className="d-none d-md-table-cell">{allergies.dose}</td>
                                        <td className="d-none d-lg-table-cell">
                                            <div className="d-none d-lg-flex justify-content-end align-items-center">
                                                <button className="view-more" onClick={handleClick}>
                                                    <span className="material-symbols-outlined">
                                                        read_more
                                                    </span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>

            <div className="result-nav my-4" id="result-navigation">
                <button>
                    <span className="material-symbols-outlined">
                        chevron_left
                    </span>
                </button>
                <div className="numbers">
                    <div className="active">1</div>
                    <div>2</div>
                    <div>3</div>
                </div>
                <button>
                    <span className="material-symbols-outlined">
                        chevron_right
                    </span>
                </button>
            </div>

        </>
    );
}





function ProfileReports() {
    // const { patientId } = useParams(); //Use this for all the backend requests

    return (
        <>
            <div className="col-12">

                <Searchbar className='mb-4'>

                    <SearchFilter>

                        <FilterGroup>

                            <FilterTitle>Select search type</FilterTitle>
                            <FilterList>
                                <FilterCategory key={1} name='type' value='name' checked={true}># Record Type/ Name</FilterCategory>
                                <FilterCategory key={2} name='type' value='location'># Record Location</FilterCategory>
                                <FilterCategory key={3} name='type' value='all'># All</FilterCategory>
                            </FilterList>

                        </FilterGroup>

                        <FilterGroup>

                            <div className="control mb-2">
                                <h6 className="me-2">Select Start Date: </h6>
                                <input type="date" />
                            </div>
                            <div className="control">
                                <h6 className="me-2">Select End Date: </h6>
                                <input type="date" />
                            </div>

                        </FilterGroup>

                    </SearchFilter>

                </Searchbar>

            </div>

            <div className="col">

                <div className="record-container px-4 py-3 section-blur shadow">

                    <div className="section-controls py-3">

                        <div className="section-links">
                            <NavLink to="." className="me-2 px-3 py-2 d-flex align-items-center" end>
                                <span className="d-none d-md-inline">Vaccinations</span>
                                <Virus2 className='ms-3' size={18}/>
                            </NavLink>
                            <NavLink to="medicals" className="me-2 px-3 py-2 d-flex align-items-center">
                                <span className="d-none d-md-inline">Medical Reports</span>
                                <ClipboardPulse className='ms-3' size={18}/>
                            </NavLink>
                            <NavLink to="allergies" className="me-2 px-3 py-2 d-flex align-items-center">
                                <span className="d-none d-md-inline">Allergies & Reactions</span>
                                <ClipboardPulse className='ms-3' size={18}/>
                            </NavLink>
                        </div>

                        <div className="tag-links">
                            <a href="/vaccinations" className="me-1 px-3 py-1 active d-none d-md-block"># Last Week</a>
                            <a href="/reports" className="me-1 px-3 py-1 d-none d-lg-block"># Last Month</a>
                            <a href="/reports" className="me-2 px-3 py-1 d-none d-md-block"># All Time</a>
                        </div>

                    </div>

                    <hr />

                    <div className="record-data mt-4" id="record-data-container">

                        <Outlet/>

                    </div>
                </div>

            </div>
        </>
    );
}

export default ProfileReports;