import pool from "../configs/database.js";

const TABLE_SCHEMAS = `
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id INTEGER REFERENCES  users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  text TEXT,
  post_id INTEGER REFERENCES  posts(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES  users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS likes (
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
  PRIMARY KEY(user_id, post_id)
);
`;

async function migrateSchemas() {
    const client = await pool.connect();
    try {
        await client.query(TABLE_SCHEMAS);
        console.log("All tables migrated✅");
    } catch (error) {
        console.log("Table migration error❎", error);
    } finally {
        client.release();
    }
}

await migrateSchemas();
