# Full Stack Starter Template

Un template professionnel pour démarrer rapidement des projets full stack avec React, Node.js, et PostgreSQL.

## 🚀 Technologies

### Frontend
- React
- Create React App
- CSS moderne
- Fetch API

### Backend
- Node.js
- Express.js
- PostgreSQL
- Docker & Docker Compose

## 📁 Structure du Projet

```
project/
├── frontend/                # Application React
│   ├── src/
│   │   ├── components/     # Composants React
│   │   ├── services/      # Services API
│   │   └── styles/        # Fichiers CSS
│   └── Dockerfile
│
├── backend/                # API Node.js
│   ├── src/
│   │   ├── config/        # Configuration
│   │   ├── models/        # Modèles de données
│   │   └── routes/        # Routes API
│   └── Dockerfile
│
├── docker-compose.yml      # Configuration Docker
└── Makefile               # Commandes make
```

## 🛠 Installation

1. Cloner le projet :
```bash
git clone [URL_DU_REPO]
cd [NOM_DU_PROJET]
```

2. Lancer avec Docker :
```bash
make
# ou
docker-compose up --build
```

## 📝 Configuration

### Variables d'Environnement

Backend (.env) :
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123
POSTGRES_DB=whaterdb
POSTGRES_HOST=db
```

## 🔧 Scripts Disponibles

```bash
# Démarrer tous les services
make

# Arrêter tous les services
make down

# Voir les logs
make logs

# Accéder au shell PostgreSQL
make db-shell
```

## 🌐 Points d'Accès API

### Test de Connexion
- GET `/api/test`
  - Test la connexion à la base de données

### Exemples
- GET `/api/examples`
  - Liste tous les exemples
- POST `/api/examples`
  - Crée un nouvel exemple
  ```json
  {
    "name": "Exemple"
  }
  ```

## 🔒 Bonnes Pratiques

1. **Structure Modulaire**
   - Séparation claire frontend/backend
   - Organisation par fonctionnalité

2. **Sécurité**
   - Variables d'environnement pour les secrets
   - Validation des entrées
   - Gestion des erreurs

3. **Docker**
   - Images légères et optimisées
   - Volumes pour la persistance
   - Configuration multi-environnement

4. **Code**
   - ESLint pour la qualité du code
   - Prettier pour le formatage
   - Tests unitaires (à venir)

## 🚧 À Venir

- [ ] Tests unitaires et d'intégration
- [ ] Authentication JWT
- [ ] Cache Redis
- [ ] CI/CD Pipeline
- [ ] Documentation API (Swagger)

## 📄 Licence

MIT
