'use strict';
module.exports = (sequelize, DataTypes) => {
  var StudentSubject = sequelize.define('StudentSubject', {
    idStudent: DataTypes.INTEGER,
    idSubject: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });

  StudentSubject.associate = (model) => {
    StudentSubject.belongsTo(model.Subject, {foreignKey: "idSubject"});
    StudentSubject.belongsTo(model.Student, {foreignKey: "idStudent"});
  }

  return StudentSubject;
};
