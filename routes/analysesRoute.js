'use strict';

const { Router } = require('express');
const router = Router();

const {
  newAnalysis,
  showAnalysisResultsJSON,
  showAnalysisArgumentsJSON,
  createAnalysis,
  createSentimentAnalysis,
  createEntitiesAnalysis,
  newEntitiesAnalysis,
  newSentimentAnalysis,
  showEntitiesAnalysisChart,
  showSentimentAnalysisChart
} = require('../controllers/analysesCtrl');

router.get('/analyses/document/:documentId/new', isLoggedIn, newAnalysis);
router.get('/analyses/document/:documentId/new/sentiment', isLoggedIn, createSentimentAnalysis);
router.get('/analyses/document/:documentId/new/entities', isLoggedIn, createEntitiesAnalysis);
// router.get('/analyses/chart/:analysisId', isLoggedIn, showEntitiesAnalysisChart);
router.get('/analyses/chart/:analysisId', isLoggedIn, showSentimentAnalysisChart)

router.get('/analyses/:analysisId', isLoggedIn, showAnalysisResultsJSON);
router.get('/analyses/arguments/:analysisId', isLoggedIn, showAnalysisArgumentsJSON);

router.post('/analyses/entities/document/:documentId', isLoggedIn, newEntitiesAnalysis);
router.post('/analyses/sentiment/document/:documentId', isLoggedIn, newSentimentAnalysis);
// router.post('/analyses/document/:documentId', isLoggedIn, createAnalysis);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}