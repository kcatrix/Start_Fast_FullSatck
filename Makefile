.PHONY: build up down restart clean logs ps start

# Variables
DOCKER_COMPOSE = sudo docker compose

# Construction des images
build:
	$(DOCKER_COMPOSE) build

# Construction sans cache
build-no-cache:
	$(DOCKER_COMPOSE) build --no-cache

# Démarrer les conteneurs
up:
	$(DOCKER_COMPOSE) up

# Démarrer les conteneurs en arrière-plan
up-d:
	$(DOCKER_COMPOSE) up -d

# Arrêter les conteneurs
down:
	$(DOCKER_COMPOSE) down

# Redémarrer les conteneurs
restart: down up

# Nettoyer tous les conteneurs, images et volumes
clean:
	$(DOCKER_COMPOSE) down --volumes --remove-orphans
	sudo docker system prune -af --volumes

# Afficher les logs
logs:
	$(DOCKER_COMPOSE) logs -f

# Afficher l'état des conteneurs
ps:
	$(DOCKER_COMPOSE) ps

# Construire et lancer l'application
start: build
	$(DOCKER_COMPOSE) up -d

# Commande par défaut
default: build
	$(DOCKER_COMPOSE) up -d

.DEFAULT_GOAL := default
