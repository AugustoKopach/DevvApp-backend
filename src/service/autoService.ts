import { AutoRepository } from '../repository/autoRepository';
import { esAutoValido } from '../untils/validarAuto';
import { v4 as uuidv4 } from 'uuid';
import type { Auto } from '../model/Auto';

export const AutoService = {
    listarAutos: (id?: string) => {
        if (id) {
            return AutoRepository.getAutosByPersonaId(id);
        }
        return AutoRepository.getAllAutos();
    },

    agregarAuto: (id: string, autoData: any): { success: boolean, auto?: Auto, error?: string } => {
        if (!esAutoValido(autoData)) {
            return { success: false, error: 'Datos del auto no válidos' };
        }

        const auto: Auto = { ...autoData, id: uuidv4() };

        const added = AutoRepository.addAutoToPersona(id, auto);
        if (!added) {
            return { success: false, error: 'Persona no encontrada' };
        }

        return { success: true, auto };
    }
};