'use strict';
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
                              // attributes: ['id']
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Student.prototype.getFullName = function() {
    return this.firstName + " " + this.lastName;
  };

  return Student;
};
