const express = require('express')
require('dotenv').config();

const cors = require('cors')

const app = express();
const axios = require('axios')

app.use(cors());
// Je veux pouvoir récupérer des body
app.use(express.json());

// Ma route characters
app.get("/characters", async (req, res) => {
  try {
    // let name = "";
    // if (req.query.name) {
    //   name = req.query.name;
    // }

    // Je crée une variable name qui vaut :
    // - req.query.name si il existe
    // - "" sinon
    // (revient au même que faire ce qu'il y a au dessus)
    const name = req.query.name || "";
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 100;

    // J'interroge le backend du reacteur en envoyant la clef API et les différents query
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.ef91iIoiWxshk8CN}&name=${name}&skip=${skip}&limit=${limit}`
    );
    // Je renvoie le data au front
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.all('*', (req, res) => {
    res.status(404).json({message: 'Cette route n\'existe pas'})
})

app.listen(process.env.PORT, () => {
    console.log('Server has started')
})