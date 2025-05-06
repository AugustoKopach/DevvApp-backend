import { Auto } from "../model/Auto";
import { Genero } from "../model/Persona";
export type PersonaResumenDTO = {
    id: string;
    dni: string;
    nombre: string;
    apellido: string;
  };

  export type PersonaDTO = {
    id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaNacimiento: string;
    genero: Genero;
    donanteOrganos: boolean;
    autos: Auto[];
  };

