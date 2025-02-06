const express = require('express');
const app = express();
const port = 3000;

const items = ['Apple', 'Banana', 'Orange'];

app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.post('/submit', (req, res) => {
    const data = req.body;
    res.send(`Received: ${JSON.stringify(data)}`);
});

app.get('/about', (req, res) => {
    res.send("About Us");
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body.items;  // Ensure the key is 'items'
    items.push(newItem);
    res.json(items);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});

