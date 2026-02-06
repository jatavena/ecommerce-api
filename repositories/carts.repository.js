import pool from "../db/db.js";
import { buildUpdateClause } from "../utilities/buildUpdateClause.js";

export const createCart = async ({ user_id, total, status }) => {
    const result = await pool.query('INSERT INTO carts (user_id, total, status) VALUES ($1, $2, $3) RETURNING id', [user_id, total, status]);
    return result.rows[0];
}

export const findCartById = async (id) => {
    const result = await pool.query('SELECT * FROM carts WHERE id = $1', [id]);
    return result.rows[0];
}

export const updateCartById = async (id, data) => {
    let { params, values, i } = buildUpdateClause(data);
    values.push(id);
    const string = 'UPDATE carts SET ' + params.join(', ') + ` WHERE id = $${i+1}`;
    const result = await pool.query(`${string}`, values);
    return result.rows[0];
}

export const deleteCartById = async (id) => {
    const result = await pool.query('DELETE FROM carts WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
}