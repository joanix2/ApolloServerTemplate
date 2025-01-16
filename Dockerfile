# Utilisez une image Node.js légère comme base
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier tout le code source dans le conteneur
COPY . .

# Installer les dépendances
RUN npm install

# Exposer le port sur lequel Apollo Server écoute (par défaut 4000)
EXPOSE 4000

# Accept APP_SECRET as a build argument
ARG APP_SECRET
ENV APP_SECRET=$APP_SECRET

# Accept DATABASE_URL as a build argument
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

# Générer Prisma Client
RUN npx prisma generate

# Install bash
RUN apk add --no-cache bash

# Démarrer l'application
CMD ["bash", "start.sh"]
