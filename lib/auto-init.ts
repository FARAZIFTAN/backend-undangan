import { WisudawanModel } from '@/models/Wisudawan';

let isInitialized = false;

export async function autoInitializeDatabase() {
  if (isInitialized) {
    console.log('✅ Database already initialized, skipping...');
    return;
  }

  try {
    console.log('🔄 Auto-initializing database...');
    await WisudawanModel.initializeDefaultData();
    isInitialized = true;
    console.log('✅ Database auto-initialized successfully!');
  } catch (error) {
    console.error('❌ Failed to auto-initialize database:', error);
    // Don't throw error, just log it
    // Server should still start even if init fails
  }
}
