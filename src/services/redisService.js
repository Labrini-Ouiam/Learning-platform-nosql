// Question : Comment gérer efficacement le cache avec Redis ?
// Réponse :Gérer efficacement le cache avec Redis implique de définir des stratégies de cache claires, comme le 
// choix des données à mettre en cache et la durée de vie (TTL) appropriée pour éviter une surcharge de mémoire. 
// Il est important de mettre en place une politique de mise à jour ou d'invalidation du cache lorsque les données
//  sous-jacentes changent, pour garantir que les utilisateurs reçoivent des informations à jour.
// Question: Quelles sont les bonnes pratiques pour les clés Redis ?
// Réponse :Les bonnes pratiques pour les clés Redis incluent l'utilisation de noms de clés descriptifs et 
// hiérarchiques pour éviter les collisions et faciliter la gestion. Par exemple, utilisez des préfixes comme 
// user:123:profile pour structurer les clés. Il est également recommandé de définir des expirations (TTL) pour 
// les clés pour éviter l'accumulation de données obsolètes, et de limiter la taille des valeurs stockées pour 
// maximiser les performances.

const redisClient = require('../config/db'); 
// Fonctions utilitaires pour Redis
async function cacheData(key, data, ttl) {
    // TODO: Implémenter une fonction générique de cache
    try {
      await redisClient.set(key, JSON.stringify(data), 'EX', ttl);
      console.log(`✅ Cached data under key: ${key}`);
    } catch (error) {
      console.error('❌ Error caching data:', error);
    }
  }
  // Fonction pour récupérer des données mises en cache
async function getCachedData(key) {
  try {
    const data = await redisClient.get(key);
    return data ? JSON.parse(data) : null; // Retourne null si aucune donnée n'est trouvée
  } catch (error) {
    console.error('❌ Error retrieving cached data:', error);
    return null;
  }
}
  
  module.exports = {
    // TODO: Exporter les fonctions utilitaires
    cacheData,
  getCachedData,
  };