// Question: Pourquoi séparer les routes dans différents fichiers ?
// Réponse : Séparer les routes dans différents fichiers permet d'améliorer la modularité et l'organisation 
// du projet. Chaque fichier peut être dédié à une entité ou fonctionnalité spécifique, ce qui rend le code 
// plus lisible et facile à maintenir. Cette approche facilite également la collaboration en équipe, car les 
// développeurs peuvent travailler sur différentes parties du projet sans interférer les uns avec les autres. 
// De plus, en isolant les routes, il est plus simple d'identifier et de gérer les différentes fonctionnalités 
// de l'application.
// Question : Comment organiser les routes de manière cohérente ?
// Réponse: Pour organiser les routes de manière cohérente, il est conseillé de les regrouper par entité ou 
// fonctionnalité, comme les cours, les utilisateurs, etc. Chaque fichier de routes doit suivre une convention de
//  nommage claire et descriptive, par exemple courseRoutes.js pour les routes liées aux cours. Il est important 
// de garder les routes simples en déléguant la logique métier aux contrôleurs, ce qui permet de séparer les 
// préoccupations et de maintenir une structure de code propre et facilement navigable.

const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes pour les cours
router.post('/', courseController.createCourse);
router.get('/:id', courseController.getCourse);
//router.get('/stats', courseController.getCourseStats); 

module.exports = router;