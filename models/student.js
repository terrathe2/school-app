'use strict';

const helper = require("../Helper/helper.js");

module.exports = (sequelize, DataTypes) => {
  var Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
            type: DataTypes.STRING,
            validate: {
                        isEmail: {
                          msg: "Email input is not valid"
                        },
                        isUnique:function(value, error) {
                          console.log(this.id,"aaaaaaaaaaaaaaa");
                          Student.find({
                              where: {
                                      email: value,
                                      id:{
                                          [sequelize.Op.not]: this.id
                                         }
                                     }
                          })
                          .then(function(match) {
                            if (match){
                              return error('Email address already in use!');
                            } else {
                              return error();
                            }
                          })
                        }
                      }
           }
  });

  Student.prototype.getFullName = function() {
    return helper.getFullName(this.firstName, this.lastName);
  };

  Student.associate = (model) => {
    Student.belongsToMany(model.Subject, {through: "StudentSubject", foreignKey: "idStudent"});
    Student.hasMany(model.StudentSubject, {foreignKey: "idStudent"});
  }

  return Student;
};
