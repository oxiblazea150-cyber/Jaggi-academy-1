import { neon } from '@neondatabase/serverless';

const db = neon(process.env.DATABASE_URL!);

// Ensure tables exist using Postgres syntax
async function initDb() {
  await db`
    CREATE TABLE IF NOT EXISTS "Admin" (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      "passwordHash" TEXT NOT NULL,
      "createdAt" TIMESTAMP DEFAULT NOW()
    );
  `;
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
}

initDb().catch(console.error);

export default db;
