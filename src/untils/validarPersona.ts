import { Persona, Genero } from '../model/Persona';

export const sonDatosValidos = (persona: Persona): boolean => {
    if (!persona) return false;

    if (
        typeof persona.nombre !== 'string' ||
        !isNaN(Number(persona.nombre)) ||
        !persona.nombre.trim() ||

        typeof persona.apellido !== 'string' ||
        !persona.apellido.trim() ||

        typeof persona.dni !== 'string' ||
        !persona.dni.trim()
    ) {
        return false;
    }

    if (typeof persona.fechaNacimiento !== 'string') {
        return false;
    }

    if (!Object.values(Genero).includes(persona.genero)) {
        return false;
    }

    if (typeof persona.donanteOrganos !== 'boolean') {
        return false;
    }

    return true;
};
