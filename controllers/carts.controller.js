import { createCart, findCartById, updateCartById, deleteCartById } from "../repositories/carts.repository.js";
import { createDataObject } from "../utilities/createDataObject.js";

export const validateType = (req, res, next) => {
    for (const [key, value] of Object.entries(req.body)) {
        if (key === 'user_id' && typeof value !== 'number') {
            return res.status(400).send(`Bad request: value for ${key} must be of type 'number'.`);   
        }
        if ((key === 'total' || key === 'status') && typeof value !== 'string') {
            return res.status(400).send(`Bad request: value for ${key} must be of type 'string'.`); 
        }
    }
    next();
}

export const postCarts = async (req, res) => {
    const data = await createDataObject(req.body);
    try {
        const cart = await createCart(data);
        res.status(201).send(`Cart ${cart.id} created successfully`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create a cart.'});
    }
}

export const getCartById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const cart = await findCartById(id);
        if (cart) {
            res.status(200).json(cart);
        } else {
            res.status(404).send(`Unable to find cart with id ${id}!`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart.'})
    }
}

export const putCartById = async (req, res) => {
    const id = parseInt(req.params.id);
    for (const key of Object.keys(req.body)) {
        if (key === 'user_id') {
            return res.status(400).send(`Bad request: cannot change customer_id in an existing cart.`);
        }
    }
    const data = await createDataObject(req.body);
    try {
        await updateCartById(id, data);
        res.status(200).send(`Cart ${id} updated successfully!`)
    } catch {
        res.status(500).json({ error: 'Failed to update cart.'})
    }
}


export const deleteCart = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await deleteCartById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send(`Cart with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete cart.` });
    }
}