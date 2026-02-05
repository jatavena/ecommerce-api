import { 
    findProducts,
    createProduct,
    findProductById,
    updateProductById,
    deleteProductById } from "../repositories/products.repository.js";
import { createDataObject } from "../utilities/createDataObject.js";

export const validateType = (req, res, next) => {
    if (req.body) {
        for (const [key, value] of Object.entries(req.body)) {
            if ((key === 'name' || key === 'producer' || key === 'description') && typeof value !== 'string') {
                return res.status(400).send(`Bad request: value for ${key} must be of type 'string'.`);
            }
            if ((key === 'price' || key === 'category_id') && typeof value !== 'number') {
                return res.status(400).send(`Bad request: value for ${key} must be of type 'number'.`);   
            }
        }
    }
    if (req.query) {
        for (const key of Object.keys(req.query)) {
            if (key !== 'name') {
                return res.status(400).send(`Bad request in query: "${key}".`);
            }
        }
    }
    next();
}

export const getProducts = async (req, res) => {
    const queryData = req.query;
    if (Object.entries(queryData).length === 0) {
        try {
            const products = await findProducts(queryData);
            res.status(200).json(products);
    
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products.' })
        }
    }
    if (Object.entries(queryData).length > 0) {
        try {
            const products = await findProducts(queryData);
            if (Object.keys(products).length > 0) {
                res.status(200).json(products);
            } else {
                res.status(404).send('Unable to find products matching your query.');
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products.'})
        }
    }
};

export const postProducts = async (req, res) => {
    const data = createDataObject(req.body);
    try {
        const product = await createProduct(data);
        res.status(201).send(`Product ${product.id} created successfully`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product.'})
    }
};

export const getProductById = async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const product = await findProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).send(`Product with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to request user.`});
    }
};

export const putProductById = (async (req, res) => {
    let id = parseInt(req.params.id);
    let data = createDataObject(req.body);
    try {
        await updateProductById(id, data);
        res.status(200).send(`Product ${id} updated successfully!`);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product.'})
    }
})

export const deleteProduct = (async (req, res) => {
    let id = parseInt(req.params.id);
    try {
        const result = await deleteProductById(id);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(404).send(`Product with id ${id} not found!`);
        }
    } catch (error) {
        res.status(500).json({ error: `Failed to delete user` });
    }
})