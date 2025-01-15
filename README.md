# Projet GraphQL avec Apollo Server et Prisma

Ce projet est une API GraphQL construite avec Apollo Server et Prisma. Ce document détaille les étapes pour initialiser le projet et configurer l'environnement.

---

## Commandes d'installation et de configuration

### 1. Initialiser un nouveau projet Node.js

```bash
npm init -y
```

- Cette commande crée un fichier `package.json` avec les paramètres par défaut.
- Ce fichier est utilisé pour gérer les dépendances et les scripts du projet.

---

### 2. Installer Apollo Server et GraphQL

```bash
npm install apollo-server graphql
```

- **`apollo-server`** : Un serveur facile à configurer pour exécuter une API GraphQL.
- **`graphql`** : La bibliothèque de base pour GraphQL utilisée par Apollo Server.

---

### 3. Installer Prisma (comme dépendance de développement)

```bash
npm install prisma --save-dev
```

- **`prisma`** : Outil CLI de Prisma utilisé pour gérer les schémas de base de données, générer des migrations et interagir avec la base de données.

---

### 4. Installer le client Prisma

```bash
npm install @prisma/client
```

- **`@prisma/client`** : Librairie générée automatiquement pour interagir avec la base de données dans votre code Node.js.

---

### 5. Initialiser Prisma

```bash
npx prisma init
```

- Cette commande initialise Prisma dans votre projet en créant :
  - Un fichier `schema.prisma` pour définir le modèle de la base de données.
  - Un fichier de configuration `.env` pour gérer les variables d'environnement.

---

### 6. Appliquer les migrations

```bash
npx prisma migrate dev
```

- **Migrations** : Convertit les modèles Prisma définis dans `schema.prisma` en tables dans la base de données.
- Lors de la première exécution, Prisma vous demandera un nom pour la migration, par exemple `init`.
- La migration crée et met à jour la base de données en fonction du schéma défini.

---

### 7. Ouvrir Prisma Studio

```bash
npx prisma studio
```

- **Prisma Studio** : Une interface utilisateur web pour visualiser et manipuler les données dans votre base de données.
- Très utile pour tester et inspecter les entrées dans la base de données.

---

## Flux de travail typique

1. **Initialisez le projet :**

   - Créez un nouveau projet avec `npm init -y`.
   - Installez les dépendances nécessaires (Apollo Server, GraphQL, Prisma).

2. **Définissez le modèle dans `schema.prisma` :**

   - Ajoutez vos modèles de base de données dans le fichier `schema.prisma`.

3. **Appliquez les migrations :**

   - Exécutez `npx prisma migrate dev` pour générer et appliquer les migrations à votre base de données.

4. **Ajoutez du code backend :**

   - Configurez Apollo Server avec Prisma Client pour gérer les résolveurs GraphQL.

5. **Testez avec Prisma Studio :**
   - Exécutez `npx prisma studio` pour vérifier les données directement dans la base de données.
