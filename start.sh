#!/bin/bash

# Script de démarrage pour appliquer les migrations Prisma et démarrer l'application

# Arrêter le script en cas d'erreur
set -e

echo "Vérification de la disponibilité de la base de données..."
# Attendre que la base de données soit prête
until nc -z -v -w30 postgres 5432; do
  echo "En attente que PostgreSQL soit prêt..."
  sleep 1
done

echo "PostgreSQL est prêt !"

# Appliquer les migrations Prisma
echo "Application des migrations Prisma..."
npx prisma migrate dev --name init
npx prisma migrate deploy

# Démarrer l'application
echo "Démarrage de l'application..."
npm start
