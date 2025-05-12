import { Auto } from '../../model/Auto';
import { IAutoRepository } from '../IAutoRepository';
import { connectToMongo } from '../../db/mongoClient';
import { Collection, ModifyResult } from 'mongodb';

export class AutoMongoRepository implements IAutoRepository {
  private readonly collectionName = 'autos';

  private async getCollection(): Promise<Collection<Auto>> {
    const db = await connectToMongo();
    return db.collection<Auto>(this.collectionName);
  }

  async getAll(): Promise<Auto[]> {
    return (await this.getCollection()).find().toArray();
  }

  async findById(id: string): Promise<Auto | null> {
    return (await this.getCollection()).findOne({ id }) ?? null;
  }

  async add(auto: Auto): Promise<void> {
    await (await this.getCollection()).insertOne(auto);
  }

  async update(idPersona: string, idAuto: string, updated: Partial<Auto>): Promise<Auto | null> {
    const collection = await this.getCollection();
    const result = await collection.findOneAndUpdate(
      { id: idAuto, duenioid: idPersona },
      { $set: updated },
      { returnDocument: 'after' }
    );

    return result.value ?? null;
  }

  async delete(idPersona: string, idAuto: string): Promise<boolean> {
    return (await (await this.getCollection()).deleteOne({ id: idAuto, duenioid: idPersona })).deletedCount > 0;
  }

  async addToPersona(idPersona: string, auto: Auto): Promise<Auto | null> {
    const autoConDuenio = { ...auto, duenioid: idPersona };
    const result = await (await this.getCollection()).insertOne(autoConDuenio);

    return result.acknowledged ? autoConDuenio : null;
  }
}