import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { Persona } from '../../model/Persona';
import { IPersonaRepository } from '../IPersonaRepository';
import { db } from '../../fireBase';

export class RepositorioPersonaFirebase implements IPersonaRepository {
  private  rutaColeccion = 'Personas';

  async getAll(): Promise<Persona[]> {
    const referenciaColeccion = collection(db, this.rutaColeccion);
    const snapshot = await getDocs(referenciaColeccion);
    const personas: Persona[] = [];

    snapshot.forEach((documento) => {
      const datos = documento.data();
      personas.push({
        id: documento.id,
        nombre: datos.nombre,
        apellido: datos.apellido,
        dni: datos.dni,
        fechaNacimiento: datos.fechaNacimiento,
        genero: datos.genero,
        donanteOrganos: datos.donanteOrganos,
        autos: datos.autos || [],
      });
    });

    return personas;
  }

  async findById(id: string): Promise<Persona | undefined> {
    const referenciaDocumento = doc(db, this.rutaColeccion, id);
    const documento = await getDoc(referenciaDocumento);

    if (!documento.exists()) return undefined;

    const datos = documento.data();
    return {
      id: documento.id,
      nombre: datos.nombre,
      apellido: datos.apellido,
      dni: datos.dni,
      fechaNacimiento: datos.fechaNacimiento,
      genero: datos.genero,
      donanteOrganos: datos.donanteOrganos,
      autos: datos.autos || [],
    };
  }

  async findByDni(dni: string): Promise<Persona | undefined> {
    const referenciaColeccion = collection(db, this.rutaColeccion);
    const consulta = query(referenciaColeccion, where('dni', '==', dni));
    const resultados = await getDocs(consulta);

    if (resultados.empty) return undefined;

    const documento = resultados.docs[0];
    const datos = documento.data();

    return {
      id: documento.id,
      nombre: datos.nombre,
      apellido: datos.apellido,
      dni: datos.dni,
      fechaNacimiento: datos.fechaNacimiento,
      genero: datos.genero,
      donanteOrganos: datos.donanteOrganos,
      autos: datos.autos || [],
    };
  }

  async add(persona: Persona): Promise<void> {
    const referenciaDocumento = doc(db, this.rutaColeccion, persona.id);
    await setDoc(referenciaDocumento, {
      nombre: persona.nombre,
      apellido: persona.apellido,
      dni: persona.dni,
      fechaNacimiento: persona.fechaNacimiento,
      genero: persona.genero,
      donanteOrganos: persona.donanteOrganos,
      autos: persona.autos,
    });
  }

  async update(id: string, updated: Partial<Persona>): Promise<boolean> {
    const referenciaDocumento = doc(db, this.rutaColeccion, id);

    try {
      await updateDoc(referenciaDocumento, updated);
      return true;
    } catch (error) {
      console.error('Error al actualizar la persona:', error);
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const referenciaDocumento = doc(db, this.rutaColeccion, id);

    try {
      await deleteDoc(referenciaDocumento);
      return true;
    } catch (error) {
      console.error('Error al eliminar la persona:', error);
      return false;
    }
  }
}
