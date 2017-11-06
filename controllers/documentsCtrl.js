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
  const { Document } = req.app.get('models');
  Document
    .findById(req.params.id)
    .then(foundDocument => {
      // console.log('the document', foundDocument);
      // res.json(foundDocument);
      res.render('document-show', { foundDocument });
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