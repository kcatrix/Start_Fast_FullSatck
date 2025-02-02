const { pool } = require('../config/database');

// Exemple de modèle
const createExampleTable = async () => {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS examples (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log('✅ Table examples créée avec succès');
  } catch (err) {
    console.error('❌ Erreur lors de la création de la table:', err.message);
  }
};

// Créer un nouvel exemple
const createExample = async (name) => {
  const query = 'INSERT INTO examples (name) VALUES ($1) RETURNING *';
  const values = [name];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    console.error('Erreur lors de la création de l\'exemple:', err.message);
    throw err;
  }
};

// Lister tous les exemples
const listExamples = async () => {
  const query = 'SELECT * FROM examples ORDER BY created_at DESC';
  
  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (err) {
    console.error('Erreur lors de la récupération des exemples:', err.message);
    throw err;
  }
};

module.exports = {
  createExampleTable,
  createExample,
  listExamples
};
