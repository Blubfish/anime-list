const { Pool } = require('pg');

const envContent = process.env.DATABASE_URL

export const pool = new Pool({
  connectionString: envContent,
});


