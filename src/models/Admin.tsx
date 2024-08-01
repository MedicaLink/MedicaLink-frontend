import { Hospital } from "./Hospital";

export interface Admin{
    id: number;

    name: string;

    email: string;

    //type: string;

    hospitalId: number;

    hospital?: Hospital
}