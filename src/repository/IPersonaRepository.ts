import { Persona } from "../model/Persona";

export interface IPersonaRepository {
  getAll(): Promise<Persona[]>;
  findById(id: string): Promise<Persona | undefined>;
  findByDni(dni: string): Promise<Persona | undefined>;
  add(persona: Persona): Promise<void>;
  update(id: string, updated: Partial<Persona>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}