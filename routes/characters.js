const express = require("express");

const router = express.Router();
const axios = require('axios')

router.get("/characters", async (req, res) => {
    console.log('lala')
    try {
      // let name = "";
      // if (req.query.name) {
      //   name = req.query.name;
      // }
  
      // Je crée une variable name qui vaut :
      // - req.query.name si il existe
      // - "" sinon
      // (revient au même que faire ce qu'il y a au dessus)
      console.log(req.query)
      const name = req.query.name || "";
      const skip = req.query.skip || 0;
      const limit = req.query.limit || 100;
  
      // J'interroge le backend du reacteur en envoyant la clef API et les différents query
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
      );
      // Je renvoie le data au front
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/character/:id", async (req, res) => {
      try {
        console.log(req.params)
        const id = req.params.id || "";
    
        // J'interroge le backend du reacteur en envoyant la clef API et les différents query
        const response = await axios.get(
          `https://lereacteur-marvel-api.herokuapp.com/character/${id}?apiKey=${process.env.API_KEY}`
        );
        // Je renvoie le data au front
        res.json(response.data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

  module.exports = router;