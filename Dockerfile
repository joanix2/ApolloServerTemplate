# Utilisez une image Node.js légère comme base
FROM node:22-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier uniquement les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code source dans le conteneur
COPY . .

# Générer Prisma Client
RUN npx prisma generate

RUN npx prisma migrate dev --name init

# Exposer le port sur lequel Apollo Server écoute (par défaut 4000)
EXPOSE 4000

# Démarrer l'application
CMD ["npm", "start"]
