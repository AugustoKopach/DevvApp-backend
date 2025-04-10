import { Persona } from '../model/Persona';
import { PersonaResumenDTO, PersonaDTO } from '../dto/personaDTO';
import {
  getAllPersonas,
  findPersonaByDni,
  findPersonaById,
  addPersona,
  updatePersona,
  deletePersona
} from '../repository/personaRespository';
import { sonDatosValidos } from '../untils/validarPersona';


type ResultadoOperacion =
  | { success: true; persona?: PersonaDTO }
  | { error: number; message: string };

export const obtenerPersonasResumen = (): PersonaResumenDTO[] => {
  return getAllPersonas().map((p) => ({
    dni: p.dni,
    nombre: p.nombre,
    apellido: p.apellido,
  }));
};

export const crearPersona = (persona: Persona): ResultadoOperacion => {
  if (!sonDatosValidos(persona)) return { error: 400, message: 'Datos inválidos' };
  if (findPersonaByDni(persona.dni)) return { error: 409, message: 'DNI en uso' };

  addPersona(persona);

  const personaDto: PersonaDTO = {
    id: persona.id,
    nombre: persona.nombre,
    apellido: persona.apellido,
    dni: persona.dni,
    fechaNacimiento: persona.fechaNacimiento,
    genero: persona.genero,
    donanteOrganos: persona.donanteOrganos,
  };

  return { success: true, persona: personaDto };
};

export const editarPersona = (id: string, updated: Partial<Persona>): ResultadoOperacion => {
  const ok = updatePersona(id, updated);
  if (!ok) return { error: 404, message: 'No se encontró ninguna persona' };
  return { success: true };
};

export const eliminarPersona = (id: string): ResultadoOperacion => {
  const ok = deletePersona(id);
  if (!ok) return { error: 404, message: 'No se encontró ninguna persona' };
  return { success: true };
};
