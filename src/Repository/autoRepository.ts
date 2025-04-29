import { Auto } from '../model/Auto';
import { addAutoToPersona } from '../repository/autoRepository';
import { AutoDTO } from '../dto/autoDTO';
import { findPersonaById, getAllPersonas } from '../repository/personaRespository';
import { Persona } from '../model/Persona';
import { v4 as uuidv4 } from 'uuid';
import { esAutoValido } from '../untils/validarAuto'
export const obtenerAutosDePersona = (idPersona: string): Auto[] | null => {
    const persona = findPersonaById(idPersona);
    if (!persona) return null;
    return persona.autos;
};

export const obtenerTodosLosAutos = (): Auto[] => {
    const personas: Persona[] = getAllPersonas();
    const autosDePersona = personas.flatMap((p: Persona) => p.autos); // <- tipado explícito
    return autosDePersona;
};

export const crearAuto = (idPersona: string, autoDTO: AutoDTO): Auto | null => {
    if (!esAutoValido(autoDTO)) return null;

    const persona = findPersonaById(idPersona);
    if (!persona) return null;

    const autoConId: Auto = {
        ...autoDTO,
        id: uuidv4(),
        duenioid: persona.id,
    };

    console.log("Creando auto:", autoConId);
    return addAutoToPersona(idPersona, autoConId);
};

export const editarAuto = (idPersona: string, idAuto: string, nuevosDatos: Partial<Auto>): Auto | null => {
    return updateAuto(idPersona, idAuto, nuevosDatos);
};

export const eliminarAuto = (idPersona: string, idAuto: string): boolean => {
    return deleteAuto(idPersona, idAuto);
};
