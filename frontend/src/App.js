import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('En attente...');
  const [error, setError] = useState(null);
  const [examples, setExamples] = useState([]);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    // Charger les exemples au démarrage
    test_backend();
    fetchExamples();
  }, []);

  const test_backend = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/test');
      const data = await response.json();
      console.log(data);
      setBackendMessage(data.message); // Ajout de cette ligne pour afficher le message
    } catch (err) {
      console.error(err);
      setBackendMessage('Erreur de connexion au backend');
    }
  };

  const fetchExamples = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/examples');
      const data = await response.json();
      setExamples(data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des exemples');
      console.error('Erreur:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/examples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      if (!response.ok) throw new Error('Erreur lors de la création');
      
      setNewName('');
      fetchExamples(); // Recharger la liste
      setError(null);
    } catch (err) {
      setError('Erreur lors de la création de l\'exemple');
      console.error('Erreur:', err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div style={{ 
          marginTop: '20px', 
          width: '100%', 
          maxWidth: '600px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <h2 style={{ marginBottom: '5px' }}>Test de la Base de Données</h2>
          <p style={{ 
            color: '#2ecc71',
            fontWeight: 'bold',
            margin: '0',
            textAlign: 'center'
          }}>
            {backendMessage}
          </p>
          {error && (
            <p style={{ color: 'red' }}>{error}</p>
          )}

          <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Entrez un nom"
              style={{ padding: '8px', marginRight: '10px' }}
            />
            <button type="submit" style={{ padding: '8px 16px' }}>
              Ajouter
            </button>
          </form>

          <div style={{ textAlign: 'left', width: '100%' }}>
            <h3>Exemples enregistrés :</h3>
            {examples.length === 0 ? (
              <p>Aucun exemple enregistré</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {examples.map(example => (
                  <li key={example.id} style={{ margin: '10px 0', padding: '10px', background: 'rgba(255,255,255,0.1)' }}>
                    {example.name} - {new Date(example.created_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
