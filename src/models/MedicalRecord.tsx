import { Admin } from "./Admin";
import { Patient } from "./Patient";

export interface MedicalRecord{
    id: number;

    patientId: number;

    adminId: number;

    recordType: string;

    description: string;

    date: string;

    filePath: string;

    patient: Patient;

    admin: Admin;

    isEditable: boolean;
}