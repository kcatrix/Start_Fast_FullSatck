// Validation des entrées
const validateExample = (data) => {
  const errors = [];

  if (!data.name) {
    errors.push('Le nom est requis');
  }

  if (data.name && typeof data.name !== 'string') {
    errors.push('Le nom doit être une chaîne de caractères');
  }

  if (data.name && data.name.length > 100) {
    errors.push('Le nom ne doit pas dépasser 100 caractères');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

module.exports = {
  validateExample,
};
