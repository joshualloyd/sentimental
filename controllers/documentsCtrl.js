'use strict';

module.exports.newDocument = (req, res, next) => {
  res.render('document-new');
};

module.exports.createDocument = (req, res, next) => {
  req.body.userId = req.session.passport.user.id;
  const { Document } = req.app.get('models');
  const document = new Document(req.body);
  document
    .save()
    .then(newDocument => {
      // console.log('RESPONSE FROM THE POST', response);
      res.redirect(`/documents/${newDocument.dataValues.id}`);
    })
    .catch(err => next(err));
};

module.exports.showDocument = (req, res, next) => {
  const { Document, Analysis } = req.app.get('models');
  let pageData = {};
  Document
    .findById(req.params.id)
    .then(foundDocument => {
      // console.log('the document', foundDocument);
      // res.json(foundDocument);
      pageData.foundDocument = foundDocument;
      return Analysis
        .findAll({
          where: {
            documentId: req.params.id
          }
        });
    })
    .then(foundAnalyses => {
      pageData.foundAnalyses = foundAnalyses;
      // console.log('WHAT IS HERE!!!!!!!!!!!', pageData.foundAnalyses[0].results);
      res.render('document-show', { pageData });
    })
    .catch(err => next(err));
};

module.exports.showDocuments = (req, res, next) => {
  const { Document } = req.app.get('models');
  Document
    .findAll({
      where: {
        userId: req.session.passport.user.id
      }
    })
    .then(foundDocuments => {
      // res.json(foundDocuments);
      res.render('document-list', { foundDocuments });
    })
    .catch(err => next(err));
};