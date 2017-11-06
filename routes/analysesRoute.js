'use strict';

const { Router } = require('express');
const router = Router();

const {
  newAnalysis,
  showAnalysis,
  createAnalysis,
} = require('../controllers/analysesCtrl');

router.get('/analyses/document/:documentId/new', isLoggedIn, newAnalysis);
router.get('/analyses/:id', isLoggedIn, showAnalysis);
router.post('/analyses/document/:documentId', isLoggedIn, createAnalysis);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}