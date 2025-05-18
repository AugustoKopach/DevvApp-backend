import { IPersonaRepository } from "./IPersonaRepository";
import { IAutoRepository } from "./IAutoRepository";

import { PersonaRepository } from "./PersonaRepository";
import { AutoRepository } from "./AutoRepository";

import { PersonaMongoRepository } from "./mongoRepository/PersonaMongoRepository";
import { AutoMongoRepository } from "./mongoRepository/AutoMongoRepository";
import { RepositorioPersonaFirebase } from "./fireBase/PersonaFBRepository";
import { RepositorioAutoFirebase } from "./fireBase/AutoFBRepository";

export class RepositoryFactory {
  private static personaRepo: IPersonaRepository;
  private static autoRepo: IAutoRepository;

  public static getPersonaRepository(): IPersonaRepository {
    if (!this.personaRepo) {
      const modo = process.env.REPOSITORY ?? "Mongo";
      if (modo === "Mongo") {
        console.log("Inicializando repositorio MongoDB...");
        this.personaRepo = new PersonaMongoRepository();
      } else if  (modo === "FireBase"){
        console.log("inicializando Repositorio en la nube FB...");
        this.personaRepo = new RepositorioPersonaFirebase();
      }
       else {
        console.log("Usando repositorio en memoria.");
        this.personaRepo = new PersonaRepository();
      }
    }
    return this.personaRepo;
  }

  public static getAutoRepository(): IAutoRepository {
    if (!this.autoRepo) {
      const modo = process.env.REPOSITORY_MODE;
      if (modo === "Mongo") {
        this.autoRepo = new AutoMongoRepository();
      }
       else if  (modo === "FireBase"){
        console.log("inicializando Repositorio en la nube FB...");
        this.autoRepo = new RepositorioAutoFirebase();
      }

      else {
        this.autoRepo = new AutoRepository();
      }
    }
    return this.autoRepo;
  }
}