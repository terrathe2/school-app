const crypto = require('crypto');

module.exports = {
  getFullName: (firstName, lastName)=> {
    return firstName + " " + lastName;
  },

  grade: (score) => {
    let grade = "";
    if (score > 85) {
      grade = "A"
    } else if (score > 70) {
      grade = "B"
    } else if (score > 55) {
      grade = "C"
    } else if (score > 40) {
      grade = "D"
    } else if (score > 0) {
      grade = "E"
    } else {
      grade = "empty"
    }

    return grade;
  },

  secretShuffle: function() {
    let alphanumeric = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    let secret = "";

    for (let i = 0; i < 8; i++) {
      secret+= alphanumeric[Math.floor(Math.random()*62)];
    }

    return secret;
  },

  secretHash: function(secret, password) {
    const hash = crypto.createHmac('md5', secret).update(password).digest('hex');
    return hash;
  }
};
