import { getDatabase } from '@/lib/mongodb';
import { Invitation } from '@/types';
import { Collection, ObjectId } from 'mongodb';

const COLLECTION_NAME = 'invitations';

export class InvitationModel {
  private static async getCollection(): Promise<Collection<Invitation>> {
    const db = await getDatabase();
    return db.collection<Invitation>(COLLECTION_NAME);
  }

  // Create new invitation
  static async create(invitation: Omit<Invitation, '_id' | 'createdAt'>): Promise<Invitation> {
    const collection = await this.getCollection();
    const now = new Date();
    const doc: Invitation = {
      ...invitation,
      createdAt: now,
      updatedAt: now,
    };
    
    const result = await collection.insertOne(doc as any);
    return { ...doc, _id: result.insertedId.toString() };
  }

  // Get all invitations for a wisudawan
  static async findByWisudawanId(wisudawanId: string): Promise<Invitation[]> {
    const collection = await this.getCollection();
    return await collection.find({ wisudawanId }).sort({ createdAt: -1 }).toArray();
  }

  // Get invitation by ID
  static async findById(id: string): Promise<Invitation | null> {
    const collection = await this.getCollection();
    try {
      return await collection.findOne({ _id: new ObjectId(id) } as any);
    } catch (error) {
      return null;
    }
  }

  // Check if invitation exists by wisudawan and tamu name
  static async findByWisudawanAndTamu(wisudawanId: string, tamu: string): Promise<Invitation | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ wisudawanId, tamu });
  }

  // Validate invitation exists (for public invite page)
  static async validate(wisudawanId: string, tamuSlug: string): Promise<boolean> {
    const collection = await this.getCollection();
    const count = await collection.countDocuments({ wisudawanId, tamuSlug });
    return count > 0;
  }

  // Delete invitation
  static async delete(id: string): Promise<boolean> {
    const collection = await this.getCollection();
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(id) } as any);
      return result.deletedCount > 0;
    } catch (error) {
      return false;
    }
  }

  // Count invitations for a wisudawan
  static async countByWisudawanId(wisudawanId: string): Promise<number> {
    const collection = await this.getCollection();
    return await collection.countDocuments({ wisudawanId });
  }

  // Delete all invitations for a wisudawan (useful for testing)
  static async deleteAllByWisudawanId(wisudawanId: string): Promise<number> {
    const collection = await this.getCollection();
    const result = await collection.deleteMany({ wisudawanId });
    return result.deletedCount;
  }
}
