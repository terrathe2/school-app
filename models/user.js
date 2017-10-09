'use strict';

const crypto = require('crypto');
const helper = require("../Helper/helper.js")

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: {
            type: DataTypes.STRING,
            validate: {
                        isUnique:function(value, next) {
                          User.find({
                              where: {
                                      username: value
                                     }
                          })
                          .then(function(match) {
                            if (match){
                              return next('Username already in use!');
                            } else {
                              return next();
                            }
                          })
                        }
                      }
           },
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    secret: {
            type: DataTypes.STRING,
            validate: {
                        isUnique:function cek(value, next) {
                          User.find({
                              where: {
                                      secret: value
                                     }
                          })
                          .then(match => {
                            if (match) {
                              value = helper.secretShuffle();
                              cek(value, next);
                            }
                              this.secret = value;
                              return next();

                          }).catch((reason) => {
                            console.log(reason);
                          })
                        }
                      }
           }
  }, {
    hooks: {
      beforeCreate: (user) => {
        const hash = crypto.createHmac('md5', user.secret).update(user.password).digest('hex');
        user.password = hash;
      }
    }
  });

  return User;
};
