import express from 'express';
import bodyParser from 'body-parser';
import usersRouter from '../routes/users.routes.js';
import productsRouter from '../routes/products.routes.js';
import ordersRouter from '../routes/orders.routes.js';
import cartsRouter from '../routes/carts.routes.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API for a simple e-commerce site'})
});

const time = new Date();

app.listen(3000, () => {
    console.log(`Server listening on port ${port}.`);
    console.log(`dev server restarted ${time}`);
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);