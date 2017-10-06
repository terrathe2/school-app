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
    } else if (score > 65) {
      grade = "C"
    } else if (score > 50) {
      grade = "D"
    } else if (score > 0) {
      grade = "E"
    } else {
      grade = "empty"
    }

    return grade;
  }
};
