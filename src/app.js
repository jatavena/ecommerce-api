import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import "dotenv/config";
import usersRouter from '../routes/users.routes.js';
import productsRouter from '../routes/products.routes.js';
import ordersRouter from '../routes/orders.routes.js';
import cartsRouter from '../routes/carts.routes.js';
import authRouter from '../routes/auth.routes.js';
import passport from 'passport';
import '../config/passport.js';

const app = express();

const store = new session.MemoryStore(); // This is only for development!

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 8, secure: false, sameSite: "none"}, // secure: false for development environment
    resave: false,
    saveUninitialized: false,
    store
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ 
            info: 'Node.js, Express, and Postgres API for a simple e-commerce site',
            authenticated: req.isAuthenticated(),
            id: req.user.id || null,
            user: req.user.username || null
        });
    } else {
        res.json({ 
            info: 'Node.js, Express, and Postgres API for a simple e-commerce site',
        });
    }
});

app.get('/auth/fail', (req, res) => {
    res.status(403).json({ msg: 'Bad credentials. Please try again!'})
});

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/carts', cartsRouter);
app.use('/auth', authRouter);

export default app;