// Question1: Comment organiser le point d'entrée de l'application ?
//Réponse à la Question 1 :Organiser le point d'entrée de l'application implique de structurer le fichier principal
//  de manière à initialiser toutes les configurations essentielles. Cela inclut la configuration des variables 
// d'environnement, l'établissement des connexions aux bases de données, la configuration des middlewares Express, 
// et le montage des routes. Le point d'entrée doit être clair et minimal, déléguant les responsabilités spécifiques
//  à d'autres modules.
// Question 2: Quelle est la meilleure façon de gérer le démarrage de l'application ?
//Réponse à la Question 2 :La meilleure façon de gérer le démarrage de l'application est d'utiliser une approche 
// asynchrone pour gérer les connexions aux bases de données et les autres services critiques. Cela permet de 
// capturer et de gérer les erreurs dès le démarrage, empêchant l'application de démarrer dans un état instable. 
// Il est également important de gérer proprement l'arrêt de l'application (par exemple, en fermant les connexions 
// aux bases de données) pour éviter les fuites de ressources ou la corruption de données.

const express = require('express');
const config = require('./config/env');
const db = require('./config/db');

const courseRoutes = require('./routes/courseRoutes');
//const studentRoutes = require('./routes/studentRoutes');

const app = express();

async function startServer() {
  try {
    // Initialisation des connexions aux bases de données
    console.log('Connecting to MongoDB...');
    await db.connectMongo(); // Connexion à MongoDB

    console.log('Connecting to Redis...');
    await db.connectRedis(); // Connexion à Redis
    
    // Configuration des middlewares Express
    app.use(express.json());

    // Monter les routes
    console.log('Mounting routes...');
    app.use('/api/courses', courseRoutes); // Routes pour les cours
    
    // Démarrer le serveur
    app.listen(config.port, () => {
      console.log(`✅ Server is running on http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1); // Quitter en cas d'erreur critique
  }
}

// Gestion propre de l'arrêt
async function gracefulShutdown(signal) {
  console.log(`${signal} signal received. Closing application...`);
  try {
    await db.disconnectMongo(); // Fermer la connexion MongoDB
    await db.disconnectRedis(); // Fermer la connexion Redis
    console.log('✅ All connections closed. Exiting process.');
    process.exit(0); // Sortie propre
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1); // Sortie avec erreur
  }
}

// Écoute des signaux système pour un arrêt propre
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Démarrer l'application
startServer();
