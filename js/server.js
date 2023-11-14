const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

let reservations = [];

app.post('/submit-reservation', (req, res) =>{
    const { name, time } = req.body;
    reservations.push({ name, time});
    res.status(200).json({ message: 'Rezervace úspěšně přidána'});
});

app.listen(port, () => {
    console.log(`Server běží na http://localhost:${port}`);
});