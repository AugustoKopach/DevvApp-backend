import { personas } from '../config/personasConfig';
import { Persona } from '../model/Persona';

export const getAllPersonas = () => {
  return personas;
};

export const findPersonaByDni = (dni: string) => {
  return personas.find(p => p.dni === dni);
};

export const addPersona = (persona: Persona) => {
  personas.push(persona);
};