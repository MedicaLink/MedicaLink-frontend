import { VaccineBrand } from "./VaccineBrand";

export interface Vaccine{
    id: number;

    name: string;

    vaccineBrands: VaccineBrand[];
}