import app from './app.js';

const port = 3000;

const time = new Date();

app.listen(3000, () => {
    console.log(`Server listening on port ${port}.`);
    console.log(`dev server restarted ${time}`);
});

