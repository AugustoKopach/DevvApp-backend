import { IPersonaRepository } from "./IPersonaRepository";
import { IAutoRepository } from "./IAutoRepository";

import { PersonaRepository } from "./PersonaRepository";
import { AutoRepository } from "./AutoRepository";

import { PersonaMongoRepository } from "./mongoRepository/PersonaMongoRepository";
import { AutoMongoRepository } from "./mongoRepository/AutoMongoRepository";

export class RepositoryFactory {
  private static personaRepo: IPersonaRepository;
  private static autoRepo: IAutoRepository;

  public static getPersonaRepository(): IPersonaRepository {
    if (!this.personaRepo) {
      const mode = process.env.REPOSITORY_MODE ?? "Mongo";
      if (mode === "Mongo") {
        console.log("Inicializando repositorio MongoDB...");
        this.personaRepo = new PersonaMongoRepository();
      } else {
        console.log("Usando repositorio en memoria.");
        this.personaRepo = new PersonaRepository();
      }
    }
    return this.personaRepo;
  }

  public static getAutoRepository(): IAutoRepository {
    if (!this.autoRepo) {
      const mode = process.env.REPOSITORY_MODE ?? "Mongo";
      if (mode === "Mongo") {
        this.autoRepo = new AutoMongoRepository();
      } else {
        this.autoRepo = new AutoRepository();
      }
    }
    return this.autoRepo;
  }
}