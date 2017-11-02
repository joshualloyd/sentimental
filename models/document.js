'use strict';
module.exports = (sequelize, DataTypes) => {
  var Document = sequelize.define('Document', {
    userId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    text: DataTypes.TEXT,
    listId: DataTypes.INTEGER,
    isPublic: DataTypes.BOOLEAN
  });
  Document.associate = models => {
    Document.hasOne(models.User, {
      foreignKey: 'id'
    });
    // Document.hasOne(models.List, {
    //   foreignKey: 'id'
    // });
  };
  return Document;
};