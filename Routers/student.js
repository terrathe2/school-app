const express = require("express");
const router = express.Router();
const models = require("../models");

router.use(function (req, res, next) {
  if (req.session.role) {
    next();
  } else {
    res.redirect("/");
  }
})

// Tampil halaman student
router.get("/student", (req, res) => {
  models.Student.findAll({include:[models.Subject], order: [["firstName", "ASC"]]}).then((rowsStudent) => {
    let message = null;
    if(req.query.message){
      message = req.query.message;
    }
    res.render("student", {dataStudent: rowsStudent, error: message, title: "Students", role: req.session.role, username: req.session.username});
  }).catch((reason) => {
    console.log(reason);
  })
})

// Tampil halaman addSubjecttoStudent
router.get("/student/addsubject/:id", (req, res) => {
models.Student.findById(req.params.id).then((rowsStudent) => {
  models.Subject.findAll().then((rowsSubject) => {
    res.render("addSubjecttoStudent", {dataStudent: rowsStudent, dataSubject: rowsSubject, title: "Assign Subject", role: req.session.role, username: req.session.username})
  })
})
})

// Tambah subject pada Student
router.post("/student/addsubject/:id", (req, res) => {
  models.StudentSubject.create({idSubject: req.body.idSubject, idStudent: req.params.id}).then(() => {
    res.redirect("/student");
  })
})

// Tampil halaman tambah Student
router.get("/student/insert", (req, res) => {
  res.render("addStudent", {title: "Add Student", role: req.session.role, username: req.session.username});
})

// Tambah data Student
router.post("/student/insert", (req, res) => {
  models.Student.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}).then(() => {
    res.redirect("/student");
  }).catch((reason) => {
    res.redirect("/student?message="+reason.errors[0].message);
  })
})

// Tampil halaman edit Student
router.get("/student/edit/:id", (req, res) => {
  models.Student.findById(req.params.id).then((rowStudent) => {
    res.render("editstudent", {dataStudent: rowStudent, title: "Edit Student's Data", role: req.session.role, username: req.session.username})
  })
})

// Edit data Student
router.post("/student/edit/:id", (req, res) => {
  models.Student.update({id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/student");
  }).catch((reason) => {
    res.redirect("/student?message="+reason.errors[0].message);
  })
})

// Hapus data Student
router.get("/student/delete/:id", (req,res) => {
  models.Student.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/student");
  })
})

module.exports = router;
