import type { Persona } from './Persona';

export type Auto = {
    id   : string;
    marca: string;
    modelo: string;
    anio: number;
    patente: string;
    color: string;
    numeroChasis: string;
    numeroMotor: string;
    duenioId : string;
};

export default Auto;
