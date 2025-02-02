const express = require('express');
const cors = require('cors');
const { waitForPostgres } = require('./src/config/database');
const { createExampleTable } = require('./src/models');
const routes = require('./src/routes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Utiliser les routes
app.use('/api', routes);

// Route racine
app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

const startServer = async () => {
  try {
    // Attendre que PostgreSQL soit prêt
    console.log('Attente de PostgreSQL...');
    await waitForPostgres();
    
    // Créer les tables si elles n'existent pas
    await createExampleTable();

    // Démarrer le serveur
    app.listen(port, () => {
      console.log(`Backend server listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Erreur au démarrage du serveur:', err);
    process.exit(1);
  }
};

startServer();
