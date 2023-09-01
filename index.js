const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());

// peut-on utiliser les 2 en une ligne
app.use(express.json());

// DB setup
mongoose.connect(process.env.MONGODB_URI);

// j'importe mes routes
const userRoutes = require("./routes/user");
const characterRoutes = require('./routes/characters')

// je les utilises
app.use(userRoutes);
app.use(characterRoutes);

app.all('*', (req, res) => {
    res.status(404).json({message: 'Cette route n\'existe pas'})
})

app.listen(process.env.PORT, () => {
    console.log('Server has started')
})