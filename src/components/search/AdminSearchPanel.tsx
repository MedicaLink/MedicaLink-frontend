import './AdminSearchPanel.css';
import SearchResult, { SearchType, SearchResultSkeleton } from './SearchResult';
import Searchbar, { FilterCategory, FilterGroup, FilterList, FilterTitle, SearchFilter } from './Searchbar';
import { useAlertSnack, AlertType } from '../AlertSnack';
import React, { useState, useEffect } from 'react';
import { Patient } from '../../models/Patient';
import axiosInstance from '../../axiosInstance';

function AdminSearchPanel() {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [searchType, setSearchType] = useState("Nic");
    const [registrationType, setRegistrationType] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [patientList, setPatientList] = useState<Patient[]>([]);
    const { showAlert } = useAlertSnack();
    let searchDebounce :NodeJS.Timeout = null;

    const handleSearchTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchType(e.target.value);
    };

    const handleRegistrationType = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationType(e.target.value);
    };

    const searchPatients = async () => {
        try {
            let response = await axiosInstance.get(`/api/patient/search?query=${searchQuery}&type=${searchType}`);

            console.log(response.data);
            console.log(searchQuery, searchType);
            setPatientList(response.data);
            setIsLoading(false);
        }
        catch (error) {
            console.log(error);
            showAlert("Error", "Something went wrong", AlertType.error);
        }
    }

    const onSearch = async () => {
        if (!isLoading) setIsLoading(true);

        clearTimeout(searchDebounce);
        searchDebounce = setTimeout(async () => {
            await searchPatients();
        }, 800);
    }

    return (
        <>
            <div className='col-12'>
                <h2 className='mb-4'># Admin Search</h2>
            </div>

            <div className="col-12">

                <Searchbar className='mb-4' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                    onSearch={onSearch}>

                    <SearchFilter>

                        <FilterGroup>

                            <FilterTitle>Select search type</FilterTitle>
                            <FilterList>
                                <FilterCategory key={1} name='type' value='Nic' checked={true} onChange={handleSearchTypeChange}># Reference Number</FilterCategory>
                                <FilterCategory key={2} name='type' value='Name' onChange={handleSearchTypeChange}># Patient Name</FilterCategory>
                                <FilterCategory key={3} name='type' value='Hospital' onChange={handleSearchTypeChange}># Registered Hospital</FilterCategory>
                            </FilterList>

                        </FilterGroup>

                        <FilterGroup>

                            <FilterTitle>Select registration type</FilterTitle>
                            <FilterList>
                                <FilterCategory key={1} name='reg_type' value='your' onChange={handleRegistrationType}># Your Hospital</FilterCategory>
                                <FilterCategory key={2} name='reg_type' value='associated' onChange={handleRegistrationType}># Associated With</FilterCategory>
                                <FilterCategory key={3} name='reg_type' value='all' checked={true} onChange={handleRegistrationType}># All</FilterCategory>
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

            <div className="col-12">

                <div id="search-result-section" className="section-blur">

                    <div className="d-flex align-items-center">
                        <h4 className="mb-0">Patient Details</h4>
                        <span className="ms-auto">Showing {patientList.length} results</span>
                    </div>

                    <hr />

                    <div className="patient-list">

                        {
                            isLoading ? (
                                Array.from({ length: 5 }).map((item, index) => {
                                    return (
                                        <SearchResultSkeleton key={index} searchType={SearchType.VIEW}/>
                                    );
                                })
                            ) : (
                                patientList.length < 1? (
                                    <div className="text-center my-5">No patients found</div>
                                ) : (
                                    patientList.map(patient => {
                                        return (
                                            <SearchResult key={patient.id} id={patient.id} referenceNo={patient.nic} name={patient.name} registeredHospital={patient.admin.hospital?.name || ""}
                                                registeredDate={patient.registeredDate} lastUpdated={patient.registeredDate} firstUpdated={patient.registeredDate} imagePath={patient.profileImage}
                                                searchType={SearchType.VIEW} searchOptions={{query:searchQuery, searchType}}></SearchResult>
                                        );
                                    })
                                )
                            )
                        }

                    </div>
                </div>

            </div>
        </>
    )
}

export default AdminSearchPanel;