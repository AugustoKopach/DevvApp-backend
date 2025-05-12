import { Persona } from "../model/Persona";
import { PersonaResumenDTO, PersonaDTO } from "../dto/personaDTO";
import { RepositoryFactory } from "../repository/RepositoryFactory";
import { v4 as uuidv4 } from "uuid";
import { sonDatosValidos } from "../untils/validarPersona";
import { esAutoValido } from "../untils/validarAuto";

const personaRepository = RepositoryFactory.getPersonaRepository();
const autoRepository = RepositoryFactory.getAutoRepository();

type ResultadoOperacion =
  | { success: true; persona?: PersonaDTO }
  | { error: number; message: string };

const validarYAsignarAutos = (personaId: string, autos: Persona['autos']) => {
  const autosValidos = [];
  let autoValido = true;

  if (Array.isArray(autos)) {
    for (const auto of autos) {
      if (esAutoValido(auto)) {
        autosValidos.push({
          ...auto,
          id: auto.id || uuidv4(),
          duenioid: personaId,
        });
      } else {
        autoValido = false;
        break;
      }
    }
  }

  if (!autoValido || autosValidos.length === 0) {
    return { valid: false, autos: [] };
  }

  return { valid: true, autos: autosValidos };
};

export const obtenerPersonasResumen = async (): Promise<PersonaResumenDTO[]> => {
  const personas = await personaRepository.getAll();
  return personas.map((p) => ({
    id: p.id,
    dni: p.dni,
    nombre: p.nombre,
    apellido: p.apellido,
  }));
};

export const obtenerPersonaPorId = async (id: string): Promise<Persona | undefined> => {
  return await personaRepository.findById(id);
};

export const crearPersona = async (persona: Persona): Promise<ResultadoOperacion> => {
  if (!sonDatosValidos(persona)) return { error: 400, message: "Datos inválidos" };

  const existente = await personaRepository.findByDni(persona.dni);
  if (existente) return { error: 409, message: "DNI en uso" };

  const { valid, autos } = validarYAsignarAutos(persona.id, persona.autos);
  if (!valid) return { error: 400, message: "Autos no válidos o no proporcionados." };

  persona.autos = autos;
  await personaRepository.add(persona);

  const personaDto: PersonaDTO = {
    id: persona.id,
    nombre: persona.nombre,
    apellido: persona.apellido,
    dni: persona.dni,
    fechaNacimiento: persona.fechaNacimiento,
    genero: persona.genero,
    donanteOrganos: persona.donanteOrganos,
    autos: persona.autos,
  };

  return { success: true, persona: personaDto };
};

export const editarPersona = async (id: string, updated: Partial<Persona>): Promise<ResultadoOperacion> => {
  const personaExistente = await personaRepository.findById(id);
  if (!personaExistente) return { error: 404, message: "Persona no encontrada" };

  if (updated.autos) {
    const { valid, autos } = validarYAsignarAutos(id, updated.autos);
    if (!valid) return { error: 400, message: "Autos no válidos." };
    updated.autos = autos;
  }

  const ok = await personaRepository.update(id, updated);
  if (!ok) return { error: 404, message: "No se encontró ninguna persona" };

  return { success: true };
};

export const eliminarPersona = async (id: string): Promise<ResultadoOperacion> => {
  const ok = await personaRepository.delete(id);
  if (!ok) return { error: 404, message: "No se encontró ninguna persona" };
  return { success: true };
};
