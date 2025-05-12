import { Auto } from "../model/Auto";

export interface IAutoRepository {
  getAll(): Promise<Auto[]>;
  addToPersona(idPersona: string, auto: Auto): Promise<Auto | null>;
  update(idPersona: string, idAuto: string, updated: Partial<Auto>): Promise<Auto | null>;
  delete(idPersona: string, idAuto: string): Promise<boolean>;
}