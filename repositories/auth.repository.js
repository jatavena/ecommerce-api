import pool from "../db/db.js";

export const selectUserForLogin = async (username) => {
    const result = await pool.query('SELECT username, password, id FROM users WHERE username = $1', [username]);
    return result.rows[0]; 
}