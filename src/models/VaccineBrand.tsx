import { Vaccination } from "./Vaccination";
import { Vaccine } from "./Vaccine";

export interface VaccineBrand{
    id: number;

    brandName: string;

    vaccineId: number;

    vaccine: Vaccine;

    vaccinations: Vaccination[]
}