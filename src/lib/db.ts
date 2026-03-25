import { neon } from '@neondatabase/serverless';

const db = neon(process.env.DATABASE_URL!);

// Tracks whether DB tables have been initialised in this process
let dbReady = false;

export async function ensureDb() {
  if (dbReady) return;
  dbReady = true; // optimistically set to avoid re-entrant calls
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
    dbReady = false; // reset so next request retries
    throw e;
  }
}

export default db;
