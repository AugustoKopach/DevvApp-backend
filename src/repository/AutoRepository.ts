import { personas } from '../config/personasConfig';
import { Auto } from '../model/Auto';
import { IAutoRepository } from './IAutoRepository';

export class AutoRepository implements IAutoRepository {
  async addToPersona(idPersona: string, auto: Auto): Promise<Auto | null> {
    const persona = personas.find(p => p.id === idPersona);
    if (!persona) return null;

    persona.autos.push(auto);
    return auto;
  }
  async getAll(): Promise<Auto[]> {
    return personas.flatMap(p => p.autos);
  }
  async update(idPersona: string, idAuto: string, nuevosDatos: Partial<Auto>): Promise<Auto | null> {
    const persona = personas.find(p => p.id === idPersona);
    if (!persona) return null;

    const auto = persona.autos.find(a => a.id === idAuto);
    if (!auto) return null;

    Object.assign(auto, nuevosDatos);
    return auto;
  }

  async delete(idPersona: string, idAuto: string): Promise<boolean> {
    const persona = personas.find(p => p.id === idPersona);
    if (!persona) return false;

    const index = persona.autos.findIndex(a => a.id === idAuto);
    if (index === -1) return false;

    persona.autos.splice(index, 1);
    return true;
  }
}