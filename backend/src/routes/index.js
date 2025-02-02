const express = require('express');
const router = express.Router();
const { createExample, listExamples } = require('../models');

// Route de test
router.get('/test', async (req, res) => {
  try {
    const { pool } = require('../config/database');
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      success: true,
      message: 'Connexion à la base de données réussie !',
      timestamp: result.rows[0].now
    });
  } catch (err) {
    res.json({ 
      success: false,
      message: 'Erreur de connexion à la base de données',
      error: err.message
    });
  }
});

// Route pour tester la base de données
router.get('/db-test', async (req, res) => {
  try {
    const { pool } = require('../config/database');
    const result = await pool.query('SELECT NOW()');
    res.json({ 
      success: true,
      message: 'Connexion à la base de données réussie',
      timestamp: result.rows[0].now
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Erreur de connexion à la base de données',
      error: err.message
    });
  }
});

// Créer un nouvel exemple
router.post('/examples', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Le nom est requis' });
    }
    const newExample = await createExample(name);
    res.status(201).json(newExample);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Lister tous les exemples
router.get('/examples', async (req, res) => {
  try {
    const examples = await listExamples();
    res.json(examples);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
