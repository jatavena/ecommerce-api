import pool from "../db/db.js";
import { findCartById, findCartProducts, updateCartById } from "../repositories/carts.repository.js";
import { createOrder, createOrderItem } from "../repositories/orders.repository.js";

const calculateTotal = (cartProducts) => {
    let total = 0;
    cartProducts.forEach((item) => {
      total = total + (parseFloat(item.unit_price)) * item.quantity;
    })
    return total;
}

export const placeOrder = async (cart_id) => {
    console.log('Hello from placeOrder!');
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const cart = await findCartById(client, cart_id);
        if (!cart) {
            throw new Error(`Cart ${cart_id} not found!`);
        }
    
        const cartProducts = await findCartProducts(client, cart_id);
        if (cartProducts.length === 0) {
            throw new Error(`No products found for cart ${cart_id}!`);
        }
    
        const total = calculateTotal(cartProducts);
        const user_id = cart.user_id;
        const order = await createOrder(client, user_id, total);
    
        const orderItemsRowCount = await createOrderItem(client, order.id, cartProducts);
        if (orderItemsRowCount.length === 0) {
            throw new Error('Error processing order items!');
        }
        const cartEmptier = {
            total: null,
            status: "converted"
        };
        const emptyCart = await updateCartById(client, cart_id, cartEmptier);
    
        await client.query('COMMIT');
        return { order, emptyCart };
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};