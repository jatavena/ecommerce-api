import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
    user: process.env.DB_USER,
    host: 'localhost',
    database: 'ecapi',
    password: process.env.DB_PASSWORD,
    port: 5432,
});

export default pool;