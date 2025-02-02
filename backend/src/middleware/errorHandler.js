// Middleware de gestion des erreurs
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Si l'erreur a un statut défini, on l'utilise
  const status = err.status || 500;
  const message = err.message || 'Une erreur est survenue';

  res.status(status).json({
    error: {
      message,
      status,
      timestamp: new Date().toISOString(),
    },
  });
};

module.exports = errorHandler;
