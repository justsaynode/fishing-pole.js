const express = require('express');
const app = express();
const port = 5000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/status', (req, res) => {
    console.log('Existence Request Recieved');
    res.status(200).send('I exist!');
});

app.listen(port, () => {
    console.log(`Test API running on port ${port}`);
});
