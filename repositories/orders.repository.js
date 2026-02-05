import pool from "../db/db.js";
import { buildQueryClause } from "../utilities/buildQueryClause.js";
import { buildUpdateClause } from "../utilities/buildUpdateClause.js";

export const findOrders = async (data) => {
    if (Object.entries(data).length === 0) {
        const result = await pool.query('SELECT * FROM orders');
        return result.rows;
    }
    if (Object.entries(data).length > 0) {
        const {keys, values, i } = buildQueryClause(data);
        if (i > 1) {
            let idArray = [];
            let dateArray = [];
            keys.forEach((key, idx) => {
                if (keys[idx][0] === 'customer_id') {
                    idArray.push(`SELECT * FROM orders WHERE ${keys[idx][0]} = ${keys[idx][1]}`);
                }
                if (keys[idx][0] === 'created_at') {
                    dateArray.push(`AND EXTRACT(YEAR FROM created_at) = ${keys[idx][1]}`);
                }                
            })
            const result = await pool.query(`${idArray} ${dateArray}`, values);
            return result.rows;
        }
        if (keys[0][0] === 'customer_id') {
            const result = await pool.query(`SELECT * FROM orders WHERE ${keys[0][0]} = ${keys[0][1]}`, values);
            return result.rows;
        }
        if (keys[0][0] === 'created_at') {
            const result = await pool.query(`SELECT * FROM orders WHERE EXTRACT(YEAR FROM created_at) = ${keys[0][1]}`, values);
            return result.rows;
        }
    }
}

export const createOrder = async ({ customer_id, total }) => {
    const result = await pool.query(
        'INSERT INTO orders (customer_id, total) VALUES ($1, $2) RETURNING id', [customer_id, total]
    );
    return result.rows[0];
}

export const findOrderById = async (id) => {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0];
}

export const updateOrderById = async (id, data) => {
    let { params, values, i } = buildUpdateClause(data);
    values.push(id);
    const string = 'UPDATE orders SET ' + params.join(', ') + ` WHERE id = $${i+1}`;
    const result = await pool.query(`${string}`, values);
    return result.rows[0];
}

export const deleteOrderById = async (id) => {
    const result = await pool.query('DELETE FROM orders WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
}
