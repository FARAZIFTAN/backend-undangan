import { getDatabase } from '@/lib/mongodb';
import { Wisudawan } from '@/types';
import { Collection } from 'mongodb';

const COLLECTION_NAME = 'wisudawan';

export class WisudawanModel {
  private static async getCollection(): Promise<Collection<Wisudawan>> {
    const db = await getDatabase();
    return db.collection<Wisudawan>(COLLECTION_NAME);
  }

  // Find wisudawan by access code
  static async findByAccessCode(accessCode: string): Promise<Wisudawan | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ accessCode });
  }

  // Find wisudawan by ID
  static async findById(id: string): Promise<Wisudawan | null> {
    const collection = await this.getCollection();
    return await collection.findOne({ id });
  }

  // Get all wisudawan
  static async findAll(): Promise<Wisudawan[]> {
    const collection = await this.getCollection();
    return await collection.find({}).toArray();
  }

  // Create new wisudawan
  static async create(wisudawan: Wisudawan): Promise<Wisudawan> {
    const collection = await this.getCollection();
    const now = new Date();
    const doc = {
      ...wisudawan,
      createdAt: now,
      updatedAt: now,
    };
    
    await collection.insertOne(doc as any);
    return doc;
  }

  // Update wisudawan quota
  static async updateQuota(id: string, quota: number): Promise<boolean> {
    const collection = await this.getCollection();
    const result = await collection.updateOne(
      { id },
      { 
        $set: { 
          quota,
          updatedAt: new Date()
        } 
      }
    );
    return result.modifiedCount > 0;
  }

  // Initialize default wisudawan data (run once on setup)
  static async initializeDefaultData(): Promise<void> {
    const collection = await this.getCollection();
    
    // Hapus semua data lama terlebih dahulu
    await collection.deleteMany({});
    console.log('Old wisudawan data deleted');
    
    // Insert data wisudawan baru
    const defaultWisudawan: Wisudawan[] = [
      {
        id: 'EDY',
        nama: 'Elisabeth Diana Yuvita',
        gelar: 'S.Tr.Log',
        prodi: 'D4 Logistik Bisnis',
        inisial: 'EDY',
        accessCode: 'EDY2025',
        quota: 10,
      },
      {
        id: 'GVN',
        nama: 'Geovitra Veronika Nona',
        gelar: 'S.Tra',
        prodi: 'D4 Transportasi Darat',
        inisial: 'GVN',
        accessCode: 'GVN2025',
        quota: 10,
      },
      {
        id: 'MRS',
        nama: 'Maria Rosari Stefania Ere Pati',
        gelar: 'S.Tra',
        prodi: 'D4 Transportasi Darat',
        inisial: 'MRS',
        accessCode: 'MRS2025',
        quota: 10,
      },
      {
        id: 'MCR',
        nama: 'Maria Carmelia Romina',
        gelar: 'S.Tra',
        prodi: 'D4 Transportasi Darat',
        inisial: 'MCR',
        accessCode: 'MCR2025',
        quota: 10,
      },
      {
        id: 'FJD',
        nama: 'Fernandito Juniantoro Dias De Jesus',
        gelar: 'S.M',
        prodi: 'D4 Manajemen Transportasi',
        inisial: 'FJD',
        accessCode: 'FJD2025',
        quota: 10,
      },
      {
        id: 'AYD',
        nama: 'Ana Yulita Da Silva',
        gelar: 'S.Log',
        prodi: 'D4 Logistik Bisnis',
        inisial: 'AYD',
        accessCode: 'AYD2025',
        quota: 10,
      },
      {
        id: 'MSN',
        nama: 'Maria Sabatini Nuro Nona Yelly',
        gelar: 'S.Log',
        prodi: 'D4 Logistik Bisnis',
        inisial: 'MSN',
        accessCode: 'MSN2025',
        quota: 10,
      },
      {
        id: 'DSS',
        nama: 'Diodatus Son Seran',
        gelar: 'S.Tra',
        prodi: 'D4 Transportasi Darat',
        inisial: 'DSS',
        accessCode: 'DSS2025',
        quota: 10,
      },
      {
        id: 'OKM',
        nama: 'Oktaviani Manek',
        gelar: 'S.Tr.Ak',
        prodi: 'D4 Akuntansi Transportasi',
        inisial: 'OKM',
        accessCode: 'OKM2025',
        quota: 10,
      },
      {
        id: 'TAS',
        nama: 'Theresia Avnesia Saja',
        gelar: 'S.Tr.Log',
        prodi: 'D4 Logistik Bisnis',
        inisial: 'TAS',
        accessCode: 'TAS2025',
        quota: 10,
      },
    ];

    await collection.insertMany(defaultWisudawan.map(w => ({
      ...w,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as any);

    console.log('✅ New wisudawan data initialized - 10 wisudawan');
  }
}
