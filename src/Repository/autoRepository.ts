import { personas } from '../config/personasConfig';
import type { Auto } from '../model/Auto';

export const AutoRepository = {
    findPersonaById: (id: string) => {
        return personas.find(p => p.id === id);
    },

    getAllAutos: (): Auto[] => {
        return personas.flatMap(p => p.autos);
    },

    getAutosByPersonaId: (id: string): Auto[] => {
        const persona = personas.find(p => p.id === id);
        return persona ? persona.autos : [];
    },

    addAutoToPersona: (id: string, auto: Auto): boolean => {
        const persona = personas.find(p => p.id === id);
        if (!persona) return false;
        persona.autos.push(auto);
        return true;
    }
};