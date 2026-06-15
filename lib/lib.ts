const { Pool } = require('pg');

const envContent = process.env.DATABASE_URL ?? ""
const match = envContent.match(/^DATABASE_URL=(.+)$/m);
if (!match) {
  console.error("DATABASE_URL not found in .env file");
  process.exit(1);
}
const connectionString = match[1].trim();

export const pool = new Pool({
  connectionString: connectionString,
});

pool.connect()
  .then(() => {
    return pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
  })
  .then((res: { rows: any[]; }) => {
    console.log("Tables in database:", res.rows.map(r => r.table_name));
  })
  .catch((err:any) => {
    console.error("Error listing tables:", err);
    process.exit(1);
  });

