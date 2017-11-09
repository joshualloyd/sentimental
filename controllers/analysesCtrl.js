'use strict';

const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');

module.exports.newAnalysis = (req, res, next) => {
  console.log('req params', req.params);
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.documentId)
    .then(foundDocument => {
      // res.json(foundDocument);
      res.render('analysis-new', { foundDocument });
    })
    .catch(err => next(err));
};

module.exports.createSentimentAnalysis = (req, res, next) => {
  console.log('req params', req.params);
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.documentId)
    .then(foundDocument => {
      // res.json(foundDocument);
      res.render('analysis-sentiment-form', { foundDocument });
    })
    .catch(err => next(err));
};

module.exports.createEntitiesAnalysis = (req, res, next) => {
  console.log('req params', req.params);
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.documentId)
    .then(foundDocument => {
      // res.json(foundDocument);
      res.render('analysis-entities-form', { foundDocument });
    })
    .catch(err => next(err));
};

module.exports.showAnalysisResultsJSON = (req, res, next) => {
  const { Analysis } = req.app.get('models');
  Analysis
    .findById(req.params.analysisId)
    .then(foundAnalysis => {
      res.json(foundAnalysis.results);
    })
    .catch(err => next(err));
};

module.exports.showAnalysisArgumentsJSON = (req, res, next) => {
  const { Analysis } = req.app.get('models');
  Analysis
    .findById(req.params.analysisId)
    .then(foundAnalysis => {
      res.json(foundAnalysis.arguments);
    })
    .catch(err => next(err));
};

module.exports.createAnalysis = (req, res, next) => {
  req.body.userId = req.session.passport.user.id;
  let natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': req.app.locals.ibm_username,
    'password': req.app.locals.ibm_password,
    'version_date': '2017-02-27'
  });
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.documentId)
    .then(foundDocument => {
      console.log('found document', foundDocument);
      const parameters = {
        text: foundDocument.text,
        features: {
          entities: {
            emotion: true,
            sentiment: true,
            limit: 2
          },
          keywords: {
            emotion: true,
            sentiment: true,
            limit: 2
          }
        }
      }
      natural_language_understanding.analyze(parameters, (err, response) => {
        if (err) {
          next(err);
        } else {
          const { Analysis } = req.app.get('models');
          Analysis
            .create({
              documentId: req.params.id,
              arguments: parameters,
              results: response
            })
            .then(createdAnalysis => {
              res.json(createdAnalysis);
            })
            .catch(err => next(err));
        }
      });

    })
    .catch(err => next(err));
}

module.exports.newEntitiesAnalysis = (req, res, next) => {
  req.body.userId = req.session.passport.user.id;
  let natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': req.app.locals.ibm_username,
    'password': req.app.locals.ibm_password,
    'version_date': '2017-02-27'
  });
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.documentId)
    .then(foundDocument => {
      // console.log('found document', foundDocument);
      const parameters = {
        text: foundDocument.text,
        features: {
          entities: {
            emotion: req.body.emotion,
            sentiment: req.body.sentiment,
            limit: req.body.limit
          }
        }
      }
      natural_language_understanding.analyze(parameters, (err, response) => {
        if (err) {
          next(err);
        } else {
          const { Analysis } = req.app.get('models');
          Analysis
            .create({
              documentId: req.params.documentId,
              arguments: parameters,
              results: response
            })
            .then(createdAnalysis => {
              // console.log('created Analysis', createdAnalysis);
              res.json(createdAnalysis);
            })
            .catch(err => next(err));
        }
      });

    })
    .catch(err => next(err));
}

module.exports.showEntitiesAnalysisChart = (req, res, next) => {
  req.body.userId = req.session.passport.user.id;
  // const { Analysis } = req.app.get('models');
  // Analysis
  //  .findById(req.params.analysisId)
  //  .then(foundAnalysis => {

  //  })
  //  .catch(err => next(err));
  res.render('analysis-entities-chart');
};

module.exports.newSentimentAnalysis = (req, res, next) => {
  req.body.userId = req.session.passport.user.id;
  let natural_language_understanding = new NaturalLanguageUnderstandingV1({
    'username': req.app.locals.ibm_username,
    'password': req.app.locals.ibm_password,
    'version_date': '2017-02-27'
  });
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.documentId)
    .then(foundDocument => {
      // console.log('found document', foundDocument);
      const parameters = {
        text: foundDocument.text,
        features: {
          sentiment: {
            targets: req.body.targets,
            document: req.body.document
          }
        }
      }
      natural_language_understanding.analyze(parameters, (err, response) => {
        if (err) {
          next(err);
        } else {
          const { Analysis } = req.app.get('models');
          Analysis
            .create({
              documentId: req.params.documentId,
              arguments: parameters,
              results: response
            })
            .then(createdAnalysis => {
              // console.log('created Analysis', createdAnalysis);
              res.json(createdAnalysis);
            })
            .catch(err => next(err));
        }
      });

    })
    .catch(err => next(err));
};

module.exports.showSentimentAnalysisChart = (req, res, next) => {
  req.body.userId = req.session.passport.user.id;
  // const { Analysis } = req.app.get('models');
  // Analysis
  //  .findById(req.params.analysisId)
  //  .then(foundAnalysis => {

  //  })
  //  .catch(err => next(err));
  res.render('analysis-sentiment-chart');
};