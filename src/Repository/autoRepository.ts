import { personas } from '../config/personasConfig';
import { Auto } from '../model/Auto';

export const addAutoToPersona = (idPersona: string, auto: Auto): Auto | null => {
    const persona = personas.find(p => p.id === idPersona);
    if (!persona) return null;

    persona.autos.push(auto);
    return auto;
};

export const updateAuto = (idPersona: string, idAuto: string, nuevosDatos: Partial<Auto>): Auto | null => {
    const persona = personas.find(p => p.id === idPersona);
    if (!persona) return null;

    const auto = persona.autos.find(a => a.id === idAuto);
    if (!auto) return null;

    Object.assign(auto, nuevosDatos);
    return auto;
};

export const deleteAuto = (idPersona: string, idAuto: string): boolean => {
    const persona = personas.find(p => p.id === idPersona);
    if (!persona) return false;

    const index = persona.autos.findIndex(a => a.id === idAuto);
    if (index === -1) return false;

    persona.autos.splice(index, 1);
    return true;
};
