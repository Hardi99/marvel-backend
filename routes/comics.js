const express = require("express");

const router = express.Router();
const axios = require('axios')

router.get("/comics", async (req, res) => {
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
        `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
      );
      // Je renvoie le data au front
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get("/comic/:id", async (req, res) => {
    try {
      console.log(req.params)
      const id = req.params.id || "";
  
      // J'interroge le backend du reacteur en envoyant la clef API et les différents query
      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comic/${id}?apiKey=${process.env.API_KEY}`
      );
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur est survenue" });
    }
  });

  router.get("/comics/:id", async (req, res) => {
    try {
      console.log(req.params);
      const id = req.params.id || "";

      const response = await axios.get(
        `https://lereacteur-marvel-api.herokuapp.com/comics/${id}?apiKey=${process.env.API_KEY}`
      );
      console.log(response.data);
      return res.status(201).json(response.data);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  });

module.exports = router;