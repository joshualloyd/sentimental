'use strict';

const { Router } = require('express');
const router = Router();

const {
  // newAnalysis,
  // createAnalysis,
  showAnalysisResultsJSON,
  showAnalysisArgumentsJSON,

  showEntitiesAnalysisChart,
  createEntitiesAnalysis,
  newEntitiesAnalysis,

  showSentimentAnalysisChart,
  createSentimentAnalysis,
  newSentimentAnalysis,

  showEmotionAnalysisChart,
  createEmotionAnalysis,
  newEmotionAnalysis
} = require('../controllers/analysesCtrl');

// router.get('/analyses/document/:documentId/new', isLoggedIn, newAnalysis);
router.get('/analyses/document/:documentId/new/sentiment', isLoggedIn, createSentimentAnalysis);
router.get('/analyses/document/:documentId/new/entities', isLoggedIn, createEntitiesAnalysis);
router.get('/analyses/document/:documentId/new/emotion', isLoggedIn, createEmotionAnalysis);

router.get('/analyses/chart/entities/:analysisId', isLoggedIn, showEntitiesAnalysisChart);
router.get('/analyses/chart/sentiment/:analysisId', isLoggedIn, showSentimentAnalysisChart);
router.get('/analyses/chart/emotion/:analysisId', isLoggedIn, showEmotionAnalysisChart);

router.get('/analyses/:analysisId', isLoggedIn, showAnalysisResultsJSON);
router.get('/analyses/arguments/:analysisId', isLoggedIn, showAnalysisArgumentsJSON);

router.post('/analyses/entities/document/:documentId', isLoggedIn, newEntitiesAnalysis);
router.post('/analyses/sentiment/document/:documentId', isLoggedIn, newSentimentAnalysis);
router.post('/analyses/emotion/document/:documentId', isLoggedIn, newEmotionAnalysis);
// router.post('/analyses/document/:documentId', isLoggedIn, createAnalysis);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}