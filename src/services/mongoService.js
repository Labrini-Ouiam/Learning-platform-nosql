// Question: Pourquoi créer des services séparés ?
// Réponse: Créer des services séparés permet d'encapsuler la logique métier et de réutiliser le code de manière
//  efficace. Cela aide à maintenir une séparation claire des responsabilités, en gardant les contrôleurs focalisés
//  sur le traitement des requêtes et les services sur la logique de manipulation des données. Cette modularité 
// améliore la testabilité et facilite la maintenance du code, car les modifications peuvent être faites au niveau 
// des services sans affecter directement les contrôleurs ou les routes

const { ObjectId } = require('mongodb');
const db = require('../config/db'); // Assurez-vous que le chemin d'import est correct

async function insertOne(collectionName, document) {
  try {
    const dbInstance = db.getMongoDb();  // Utilisez la fonction getMongoDb pour obtenir l'instance DB
    const result = await dbInstance.collection(collectionName).insertOne(document);
    return result;
  } catch (error) {
    console.error('❌ Error during MongoDB insert:', error);
    throw error;
  }
}

// Recherche d'un document par ID
// Recherche d'un document par ID


// Recherche d'un document par ID
async function findOneById(collectionName, id) {
  try {
    const dbInstance = db.getMongoDb();  // Utilisez la fonction getMongoDb pour obtenir l'instance DB
    // Utilisez 'new ObjectId(id)' pour créer une instance d'ObjectId
    return await dbInstance.collection(collectionName).findOne({ _id: new ObjectId(id) });
  } catch (error) {
    console.error('❌ Error during MongoDB findOne:', error);
    throw error;
  }
}
// Nouvelle méthode pour récupérer les statistiques des cours
async function getCourseStats() {
  try {
    const dbInstance = db.getMongoDb();
    const totalCourses = await dbInstance.collection('courses').countDocuments();
    const averageDuration = await dbInstance.collection('courses').aggregate([
      {
        $group: {
          _id: null,
          avgDuration: { $avg: "$duration" }
        }
      }
    ]).toArray();

    return {
      totalCourses,
      averageDuration: averageDuration.length > 0 ? averageDuration[0].avgDuration : 0,
    };
  } catch (error) {
    console.error('❌ Error during MongoDB getCourseStats:', error);
    throw error;
  }
}




module.exports = {
  insertOne,
  findOneById,
  getCourseStats,

};
