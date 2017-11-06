'use strict';

const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
  res.render('index');
});

// pipe all other requests through the route modules
router.use(require('./authRoute'));
// router.use(require('./foo'));
router.use(require('./documentsRoute'));
router.use(require('./analysesRoute'));

router.get('/test', (req, res, next) => {
  res.render('react-test');
});

module.exports = router;
