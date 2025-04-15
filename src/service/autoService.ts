import { Auto } from '../model/Auto';
import { addAutoToPersona, updateAuto, deleteAuto } from '../repository/autoRepository';
import { AutoDTO } from '../dto/autoDTO';
import { findPersonaById, getAllPersonas } from '../repository/personaRespository';
import { v4 as uuidv4 } from 'uuid';
import { esAutoValido } from '../untils/validarAuto';

export const obtenerAutosDePersona = (idPersona: string) => {
    const persona = findPersonaById(idPersona);
    if (!persona) return null;
    return persona.autos;
  };

  export const obtenerTodosLosAutos = () => {
    const personas = getAllPersonas();
    const autosDePersona = personas.flatMap(p => p.autos);
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

    return addAutoToPersona(idPersona, autoConId);
};
export const editarAuto = (idPersona: string, idAuto: string, nuevosDatos: Partial<Auto>) => {
    return updateAuto(idPersona, idAuto, nuevosDatos);
};

export const eliminarAuto = (idPersona: string, idAuto: string) => {
    return deleteAuto(idPersona, idAuto);
};