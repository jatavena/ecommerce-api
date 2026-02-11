import pool from "../db/db.js";
import { buildQueryClause } from "../utilities/buildQueryClause.js";
import { buildUpdateClause } from "../utilities/buildUpdateClause.js";

export const findProducts = async (data) => {
    if (Object.entries(data).length === 0) {
        const result = await pool.query('SELECT * FROM products');
        return result.rows;
    }
    if (Object.entries(data).length > 0) {
        const {keys, values, i } = buildQueryClause(data);
        if (i > 1) {
            const start = `SELECT * FROM products WHERE ${keys[0][0]} ILIKE ${keys[0][1]}`;
            let endingArray = [];
            keys.forEach((element, idx) => {
                if (idx > 0) {
                endingArray.push(`AND ${keys[idx][0]} ILIKE ${keys[idx][1]}`);
                }                
            })
            const result = await pool.query(`${start} ${endingArray.join(" ")}`, values);
            return result.rows[0];
        }
        const result = await pool.query(`SELECT * FROM products WHERE ${keys[0][0]} ILIKE ${keys[0][1]}`, values);
        return result.rows;
    }
}

export const createProduct = async (data) => {
    const result = await pool.query(
        'INSERT INTO products (name, producer, price, description, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [data.name, data.producer, data.price, data.description, data.category_id]
    );
    return result.rows[0];
}

export const findProductById = async (id) => {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0];
}

export const updateProductById = async (id, data) => {
    let { params, values, i } = buildUpdateClause(data);
    values.push(id);
    const string = 'UPDATE products SET ' + params.join(', ') + ` WHERE id = $${i+1}`;
    const result = await pool.query(`${string}`, values);
    return result.rows[0];
}

export const deleteProductById = async (id) => {
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    return result.rows[0];
}

