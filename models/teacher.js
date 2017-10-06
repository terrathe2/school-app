'use strict';

const helper = require("../Helper/helper.js");

module.exports = (sequelize, DataTypes) => {
  var Teacher = sequelize.define('Teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
            type: DataTypes.STRING,
            validate: {
                        isEmail: {
                          msg: "Email input is not valid"
                        },
                        isUnique:function(value, error) {
                          Teacher.find({
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
           },
    idSubject: DataTypes.INTEGER
  });

  Teacher.prototype.getFullName = function() {
    return helper.getFullName(this.firstName, this.lastName);
  };

  Teacher.associate = (model) => {
    Teacher.belongsTo(model.Subject, {foreignKey: "idSubject"})
  }

  return Teacher;
};
