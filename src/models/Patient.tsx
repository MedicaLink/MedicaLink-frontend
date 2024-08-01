import { Admin } from "./Admin";
import { MedicalRecord } from "./MedicalRecord";
import { Vaccination } from "./Vaccination";

export interface Patient {
    id: number;

    name: string;

    nic: string;

    bloodGroup: string;

    height: number;

    weight: number;

    dateOfBirth: string;

    address: string;

    gender: number;

    age? : number;

    contactNumber: string;

    profileImage: string;

    registeredDate: string;

    registeredBy: number;

    admin: Admin;

    vaccinations: Vaccination[];

    medicalRecords: MedicalRecord[];
}