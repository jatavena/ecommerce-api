import pool from '../db/db.js';

const findAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users LIMIT 10');
    return result.rows;
}

export default findAllUsers;