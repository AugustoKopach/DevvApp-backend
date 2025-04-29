import { Persona } from '../model/Persona';
import { personas } from '../config/personasConfig';

export const getAllPersonas = () => personas;

export const findPersonaByDni = (dni: string) =>
  personas.find(p => p.dni === dni);

export const findPersonaById = (id: string) =>
  personas.find(p => p.id === id);

export const addPersona = (persona: Persona) => {
  personas.push(persona);
};

export const updatePersona = (id: string, updated: Partial<Persona>) => {
  const persona = findPersonaById(id);
  if (persona) {
    Object.assign(persona, updated);
    return true;
  }
  return false;
};

export const deletePersona = (id: string) => {
  const index = personas.findIndex(p => p.id === id);
  if (index !== -1) {
    personas.splice(index, 1);
    return true;
  }
  return false;
};