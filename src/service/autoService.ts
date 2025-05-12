import { Auto } from "../model/Auto";
import { AutoDTO } from "../dto/autoDTO";
import { PersonaRepository } from "../repository/PersonaRepository";
import { RepositoryFactory } from "../repository/RepositoryFactory";
import { v4 as uuidv4 } from "uuid";
import { esAutoValido } from "../untils/validarAuto";

const personaRepository = RepositoryFactory.getPersonaRepository();
const autoRepository = RepositoryFactory.getAutoRepository();

export const obtenerAutosDePersona = async (idPersona: string): Promise<Auto[] | null> => {
  const persona = await personaRepository.findById(idPersona);
  if (!persona) return null;
  return persona.autos;
};

export const obtenerTodosLosAutos = async (): Promise<Auto[]> => {
  const personas = await personaRepository.getAll();
  let autos: Auto[] = [];

  for (const persona of personas) {
    if (persona.autos && persona.autos.length > 0) {
      autos = autos.concat(persona.autos);
    }
  }

  return autos;
};

export const crearAuto = async (idPersona: string, autoDTO: AutoDTO): Promise<Auto | null> => {
  if (!esAutoValido(autoDTO)) return null;

  const persona = await personaRepository.findById(idPersona);
  if (!persona) return null;

  const autoConId: Auto = {
    ...autoDTO,
    id: uuidv4(),
    duenioId: persona.id,
  };

  console.log("Creando auto:", autoConId);
  return await autoRepository.addToPersona(idPersona, autoConId);
};

export const editarAuto = async (idPersona: string, idAuto: string, nuevosDatos: Partial<Auto>): Promise<Auto | null> => {
  return await autoRepository.update(idPersona, idAuto, nuevosDatos);
};

export const eliminarAuto = async (idPersona: string, idAuto: string): Promise<boolean> => {
  return await autoRepository.delete(idPersona, idAuto);
};