const API_BASE_URL = 'http://localhost:3001/api';

export const api = {
  // Test de connexion à la base de données
  testConnection: async () => {
    const response = await fetch(`${API_BASE_URL}/test`);
    return response.json();
  },

  // Exemples
  examples: {
    // Liste tous les exemples
    list: async () => {
      const response = await fetch(`${API_BASE_URL}/examples`);
      return response.json();
    },

    // Crée un nouvel exemple
    create: async (name) => {
      const response = await fetch(`${API_BASE_URL}/examples`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });
      return response.json();
    },
  },
};

export default api;
