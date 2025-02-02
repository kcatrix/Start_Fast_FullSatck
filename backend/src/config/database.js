const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

// Attendre que PostgreSQL soit prêt
const waitForPostgres = async (maxAttempts = 20) => {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const client = await pool.connect();
      console.log('✅ Connexion à PostgreSQL réussie après', attempt, 'tentative(s)');
      await client.release();
      return true;
    } catch (err) {
      console.log(`Tentative ${attempt}/${maxAttempts} - En attente de PostgreSQL...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
  throw new Error(`Impossible de se connecter à PostgreSQL après ${maxAttempts} tentatives`);
};

// Test de connexion
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Connexion à PostgreSQL réussie');
    await client.release();
    return true;
  } catch (err) {
    console.error('❌ Erreur de connexion à PostgreSQL:', err.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  waitForPostgres
};
