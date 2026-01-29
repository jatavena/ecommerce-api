import pool from '../db/db.js';
import { buildUpdateClause } from '../utilities/buildUpdateClause.js';

export const findAllUsers = async () => {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
}

export const createUser = async ({ username, first_name, last_name, password, birthday}) => {
    const result = await pool.query(
        `INSERT INTO users (username, first_name, last_name, password, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [username, first_name, last_name, password, birthday]
    );
    return result.rows[0];
}

export const findUserById = async (id) => {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
    return result.rows[0];
}

export const updateUserById = async (id, data) => {
    let { params, values, i } = buildUpdateClause(data);
    values.push(id);
    const string1 = 'UPDATE users SET ' + params.join(', ') + ` WHERE id = $${i+1}`;
    const result = await pool.query(`${string1}`, values);
    return result.rows[0];
}

