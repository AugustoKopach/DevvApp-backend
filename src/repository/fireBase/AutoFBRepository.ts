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
  addDoc,
} from 'firebase/firestore';
import { Auto } from '../../model/Auto';
import { IAutoRepository } from '../IAutoRepository';
import { db } from '../../fireBase';

export class RepositorioAutoFirebase implements IAutoRepository {
  private rutaColeccion = 'Autos';

  async getAll(): Promise<Auto[]> {
    const coleccion = collection(db, this.rutaColeccion);
    const snapshot = await getDocs(coleccion);
    const autos: Auto[] = [];

    snapshot.forEach((x) => {
      const autofire = x.data();
      autos.push({
        id: autofire.id,
        marca: autofire.marca,
        modelo: autofire.modelo,
        anio: autofire.anio,
        patente: autofire.patente,
        color: autofire.color,
        numeroChasis: autofire.numeroChasis,
        numeroMotor: autofire.numeroMotor,
        duenioId: autofire.duenioid,
      });
    });

    return autos;
  }

  async findById(id: string): Promise<Auto | undefined> {
    const docRef = doc(db, this.rutaColeccion, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return undefined;

    const data = docSnap.data();
    return {
      id: data.id,
      marca: data.marca,
      modelo: data.modelo,
      anio: data.anio,
      patente: data.patente,
      color: data.color,
      numeroChasis: data.numeroChasis,
      numeroMotor: data.numeroMotor,
      duenioId: data.duenioid,
    };
  }

  async findByPatente(patente: string): Promise<Auto | undefined> {
    const q = query(collection(db, this.rutaColeccion), where('patente', '==', patente));
    const snapshot = await getDocs(q);

    if (snapshot.empty) return undefined;

    const data = snapshot.docs[0].data();
    return {
      id: data.id,
      marca: data.marca,
      modelo: data.modelo,
      anio: data.anio,
      patente: data.patente,
      color: data.color,
      numeroChasis: data.numeroChasis,
      numeroMotor: data.numeroMotor,
      duenioId: data.duenioid,
    };
  }

  async add(auto: Auto): Promise<void> {
    await setDoc(doc(db, this.rutaColeccion, auto.id), auto);
  }

async update(idPersona: string, idAuto: string, updated: Partial<Auto>): Promise<Auto | null> {
  const docRef = doc(db, this.rutaColeccion, idAuto);

  try {
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) return null;

    const data = snapshot.data();
    if (!data || data.duenioid !== idPersona) return null;

    await updateDoc(docRef, updated);

    const actualizado = await getDoc(docRef);
    const autoActualizado = actualizado.data();

    if (!autoActualizado) return null;

    return {
      id: idAuto,
      marca: autoActualizado.marca,
      modelo: autoActualizado.modelo,
      anio: autoActualizado.anio,
      patente: autoActualizado.patente,
      color: autoActualizado.color,
      numeroChasis: autoActualizado.numeroChasis,
      numeroMotor: autoActualizado.numeroMotor,
      duenioId: autoActualizado.duenioid,
    };
  } catch (error) {
    console.error("Error actualizando auto:", error);
    return null;
  }
}
async delete(id: string): Promise<boolean> {
    const docRef = doc(db, this.rutaColeccion, id);
    try {
      await deleteDoc(docRef);
      return true;
    } catch (error) {
      console.error("Error eliminando auto:", error);
      return false;
    }
  }
  async addToPersona(idPersona: string, auto: Auto): Promise<Auto | null> {
    try {
      const autoConDuenio = { ...auto, duenioid: idPersona };
      const docRef = await addDoc(collection(db, this.rutaColeccion), autoConDuenio);

      return { ...autoConDuenio, id: docRef.id };
    } catch (error) {
      console.error("Error agregando auto a persona:", error);
      return null;
    }
  }
}
