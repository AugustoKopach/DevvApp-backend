import { Persona } from '../model/Persona';
import { personas } from '../config/personasConfig';
import { IPersonaRepository } from './IPersonaRepository';

export class PersonaRepository implements IPersonaRepository {
  async getAll(): Promise<Persona[]> {
    return personas;
  }

  async findByDni(dni: string): Promise<Persona | undefined> {
    return personas.find(p => p.dni === dni);
  }

  async findById(id: string): Promise<Persona | undefined> {
    return personas.find(p => p.id === id);
  }

  async add(persona: Persona): Promise<void> {
    personas.push(persona);
  }

  async update(id: string, updated: Partial<Persona>): Promise<boolean> {
    const persona = personas.find(p => p.id === id);
    if (persona) {
      Object.assign(persona, updated);
      return true;
    }
    return false;
  }

  async delete(id: string): Promise<boolean> {
    const index = personas.findIndex(p => p.id === id);
    if (index !== -1) {
      personas.splice(index, 1);
      return true;
    }
    return false;
  }

}
