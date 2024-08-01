import { Hospital } from "./Hospital";
import { Patient } from "./Patient";
import { VaccineBrand } from "./VaccineBrand";

export interface Vaccination{
    id: number;

    patientId: number | string;

    hospitalId: number | string;

    vaccineBrandId: number | string;

    dateOfVaccination: string;

    dose: string;

    patient?: Patient;

    hospital?: Hospital;

    vaccineBrand?: VaccineBrand;

    isEditable: boolean;
}