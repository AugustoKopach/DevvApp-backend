import { Persona } from '../../model/Persona';
import { IPersonaRepository } from '../IPersonaRepository';
import { connectToMongo } from '../../db/mongoClient';
import { ObjectId } from 'mongodb';

export class PersonaMongoRepository implements IPersonaRepository {
  private readonly collectionName = 'personas';

  private async getCollection() {
    const db = await connectToMongo();
    return db.collection<Persona>(this.collectionName);
  }

  async getAll(): Promise<Persona[]> {
    const collection = await this.getCollection();
    return await collection.find().toArray();
  }

  async findByDni(dni: string): Promise<Persona | undefined> {
    const collection = await this.getCollection();
    return await collection.findOne({ dni }) || undefined;
  }

  async findById(id: string): Promise<Persona | undefined> {
    const collection = await this.getCollection();
    return await collection.findOne({ id }) || undefined;
  }

  async add(persona: Persona): Promise<void> {
    const collection = await this.getCollection();
    await collection.insertOne(persona);
  }

  async update(id: string, updated: Partial<Persona>): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne({ id }, { $set: updated });
    return result.modifiedCount > 0;
  }

  async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  }
}