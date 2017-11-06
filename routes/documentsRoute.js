'use strict';

const { Router } = require('express');
const router = Router();

const {
  newDocument,
  showDocument,
  createDocument,
  showDocuments
} = require('../controllers/documentsCtrl');

router.get('/documents/new', isLoggedIn, newDocument);
router.get('/documents/:id', isLoggedIn, showDocument);
router.get('/documents', isLoggedIn, showDocuments);
router.post('/documents', isLoggedIn, createDocument);

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/login');
}