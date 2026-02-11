import pool from '../db/db.js';
import { buildUpdateClause } from '../utilities/buildUpdateClause.js';
import { buildQueryClause } from '../utilities/buildQueryClause.js';

export const findUsers = async (data) => {
    if (Object.entries(data).length === 0) {
        const result = await pool.query('SELECT * FROM users');
        return result.rows;
    }
    if (Object.entries(data).length > 0) {
        const { keys, values, i } = buildQueryClause(data);
        if (i > 1) {
            const start = `SELECT * FROM users WHERE ${keys[0][0]} ILIKE ${keys[0][1]}`;
            let endingArray = [];
            keys.forEach((element, idx) => {
                if (idx > 0) {
                endingArray.push(`AND ${keys[idx][0]} ILIKE ${keys[idx][1]}`);
                }                
            })
            const result = await pool.query(`${start} ${endingArray.join(" ")}`, values);
            return result.rows[0];
        }
        const result = await pool.query(`SELECT * FROM users WHERE ${keys[0][0]} ILIKE ${keys[0][1]}`, values);
        return result.rows;
    }
}

export const createUser = async (data) => {
    const result = await pool.query(
        `INSERT INTO users (username, first_name, last_name, password, birthday) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [data.username, data.first_name, data.last_name, data.password, data.birthday ?? null]
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
    const string = 'UPDATE users SET ' + params.join(', ') + ` WHERE id = $${i+1}`;
    const result = await pool.query(`${string}`, values);
    return result.rows[0];
}

export const deleteUserById = async (id) => {
    const result = await pool.query('DELETE FROM users WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
}
