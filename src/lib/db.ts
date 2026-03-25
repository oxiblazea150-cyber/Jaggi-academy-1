import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'prisma');
const DB_PATH = path.join(DB_DIR, 'dev.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);

// Enable WAL mode for performance
db.pragma('journal_mode = WAL');

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS Admin (
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS WallOfFame (
    id TEXT PRIMARY KEY,
    studentName TEXT NOT NULL,
    examName TEXT NOT NULL,
    rank TEXT NOT NULL,
    photoPlaceholder TEXT,
    imageUrl TEXT,
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS TimetableEntry (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    subject TEXT NOT NULL,
    day TEXT NOT NULL,
    timeStr TEXT NOT NULL,
    createdAt TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS SiteMedia (
    key TEXT PRIMARY KEY,
    imageUrl TEXT NOT NULL,
    label TEXT,
    updatedAt TEXT DEFAULT (datetime('now'))
  );
`);

export default db;
