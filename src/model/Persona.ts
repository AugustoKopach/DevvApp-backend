import type { Auto } from './Auto';

export enum Genero {
    Masculino = 'Masculino',
    Femenino = 'Femenino',
    NoBinario = 'No-Binario'
}

export type Persona = {
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
    genero: Genero;
    donanteOrganos: boolean;
    autos: Auto[];
};

export default Persona;
