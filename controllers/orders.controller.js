import { 
    findOrders,
    findOrderById,
    createOrder,
    updateOrderById,
    deleteOrderById,
 } from "../repositories/orders.repository.js";
import { createDataObject } from "../utilities/createDataObject.js";

export const validateType = (req, res, next) => {
    if (req.body) {
        for (const [key, value] of Object.entries(req.body)) {
            if (key === 'customer_id' && typeof value !== 'number') {
                return res.status(400).send(`Bad request: value for ${key} must be of type 'number'.`);   
            }
            if (key === 'total' && typeof value !== 'string') {
                return res.status(400).send(`Bad request: value for ${key} must be of type 'string'.`); 
            }
        }
    }
    if (req.query) {
        for (const key of Object.keys(req.query)) {
            if (key !== 'created_at' && key !== 'customer_id') {
                return res.status(400).send(`Bad request in query: "${key}".`);
            }
        }
    }
    next();
}

export const getOrders = async (req, res) => {
    const queryData = req.query;
    if (Object.entries(queryData).length === 0) {
        try {
            const orders = await findOrders(queryData);
            res.status(200).json(orders);
    
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch orders.' })
        }
    }
    if (Object.entries(queryData).length > 0) {
        try {
            const orders = await findOrders(queryData);
            if (Object.keys(orders).length > 0) {
                res.status(200).json(orders);
            } else {
                res.status(404).send('Unable to find orders matching your query.');
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch orders.'})
        }
    }
};

export const postOrder = async (req, res) => {
    const data = await createDataObject(req.body);
    try {
        const order = await createOrder(data);
        res.status(201).send(`Order ${order.id} created successfully`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order. Chaos reigns!'})
    }
};

export const getOrderById = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const order = await findOrderById(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).send(`Order with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to request order.`});
    }
};

export const putOrderById = (async (req, res) => {
    let id = parseInt(req.params.id);
    for (const key of Object.keys(req.body)) {
        if (key === 'customer_id') {
            return res.status(400).send(`Bad request: cannot change customer_id in an existing order.`);
        }
    }
    let data = await createDataObject(req.body);
    try {
        await updateOrderById(id, data);
        res.status(200).send(`Order ${id} updated successfully!`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order.'})
    }
})

export const deleteOrder = (async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const result = await deleteOrderById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send(`Order with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete order.` });
    }
})