'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subject = sequelize.define('Subject', {
    subjectName: DataTypes.STRING
  });

  Subject.associate = (model) => {
    Subject.hasMany(model.Teacher, {foreignKey: "idSubject"});
    Subject.belongsToMany(model.Student, {through: "StudentSubject", foreignKey: "idSubject"});
    Subject.hasMany(model.StudentSubject, {foreignKey: "idSubject"});
  }
  return Subject;
};
