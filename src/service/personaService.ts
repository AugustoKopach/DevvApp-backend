import { v4 as uuidv4 } from 'uuid';
import { Persona } from '../model/Persona';
import { getAllPersonas, findPersonaByDni, addPersona } from '../repository/personaRespository';
import { sonDatosValidos } from '../untils/validarPersona';

export const obtenerPersonas = () => {
   return getAllPersonas().map((p: Persona) => ({ dni: p.dni, nombre: p.nombre, apellido: p.apellido }));
};

export const crearPersona = (persona: Persona) => {
  if (!sonDatosValidos(persona)) {
    throw new Error('Datos no validos');
  }

  if (findPersonaByDni(persona.dni)) {
    throw new Error('DNI en uso');
  }

  const nuevaPersona = {
    ...persona,
    id: uuidv4(),
    autos: persona.autos || [],
  };

  addPersona(nuevaPersona);
  return nuevaPersona;
};