'use strict';
module.exports = (sequelize, DataTypes) => {
  var Analysis = sequelize.define('Analysis', {
    documentId: DataTypes.INTEGER,
    arguments: DataTypes.JSONB,
    results: DataTypes.JSONB
  });
  Analysis.associate = models => {
    Analysis.hasOne(models.Document, {
      foreignKey: 'id'
    });
  };
  return Analysis;
};