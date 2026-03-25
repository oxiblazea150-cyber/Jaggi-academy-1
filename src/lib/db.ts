import { neon } from '@neondatabase/serverless';

let _db: ReturnType<typeof neon> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error('DATABASE_URL is not set');
    }
    _db = neon(url);
  }
  return _db;
}

// Tracks whether DB tables have been initialised in this process
let dbReady = false;

export async function ensureDb() {
  if (dbReady) return;
  dbReady = true;
  const db = getDb();
  try {
    await db`
      CREATE TABLE IF NOT EXISTS "WallOfFame" (
        id TEXT PRIMARY KEY,
        "studentName" TEXT NOT NULL,
        "examName" TEXT NOT NULL,
        rank TEXT NOT NULL,
        "photoPlaceholder" TEXT,
        "imageUrl" TEXT,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `;
    await db`
      CREATE TABLE IF NOT EXISTS "TimetableEntry" (
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        subject TEXT NOT NULL,
        day TEXT NOT NULL,
        "timeStr" TEXT NOT NULL,
        "createdAt" TIMESTAMP DEFAULT NOW()
      );
    `;
    await db`
      CREATE TABLE IF NOT EXISTS "SiteMedia" (
        key TEXT PRIMARY KEY,
        "imageUrl" TEXT NOT NULL,
        label TEXT,
        "updatedAt" TIMESTAMP DEFAULT NOW()
      );
    `;
  } catch (e) {
    dbReady = false;
    throw e;
  }
}
