import type { AutoDTO } from '../dto/autoDTO';

export const esAutoValido = (auto: AutoDTO
): boolean => {
    if (!auto) return false;

    const {
        marca,
        modelo,
        anio,
        patente,
        color,
        numeroChasis,
        numeroMotor
    } = auto;

    if (
        typeof marca !== 'string' || !marca.trim() ||
        typeof modelo !== 'string' || !modelo.trim() ||
        typeof patente !== 'string' || !patente.trim() ||
        typeof color !== 'string' || !color.trim() ||
        typeof numeroChasis !== 'string' || !numeroChasis.trim() ||
        typeof numeroMotor !== 'string' || !numeroMotor.trim()
    ) {
        return false;
    }

    const anioActual = new Date().getFullYear();
    if (typeof anio !== 'number' || anio < 1800 || anio > anioActual) {
        return false;
    }

    return true;
};
