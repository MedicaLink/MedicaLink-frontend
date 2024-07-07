import { Admin } from "./Admin";

export interface Hospital{
    id: number;

    name: string;

    type: string;

    address: string;

    branch: string;

    logoImage: string;

    admins: Admin[]
}