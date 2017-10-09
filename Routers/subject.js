const express = require("express");
const router = express.Router();
const models = require("../models");
const helper = require("../Helper/helper")

router.use(function (req, res, next) {
  console.log('aa');
  if (req.session.role === "academic" || req.session.role === "headmaster") {
    next();
  } else {
    res.redirect("/");
  }
})

// Tampil halaman Subject
router.get("/subject", (req, res) => {
  models.Subject.findAll({include: [models.Teacher]}).then((rowsSubject) => {
    let message = null;
    if (req.query.message) {
      message = req.query.message;
    }
    // console.log(rowsSubject[0].Teachers[0].getFullName());
    res.render("subject", {dataSubject: rowsSubject, error: message, title: "Subjects", role: req.session.role, username: req.session.username});
  })
})

// Tampil halaman enrolledstudents
router.get("/subject/enrolledstudents/:id", (req, res) => {
  models.StudentSubject.findAll({include: [models.Subject, models.Student], order:[[models.Student, "firstName", "ASC"]], attributes: ["id","idStudent","idSubject","score"], where:{idSubject: req.params.id}}).then((rowsStudentSubject) => {
    if (rowsStudentSubject.length === 0) {
      res.redirect("/subject?message=Sorry There's no Student in that Subject, Please Add Student First")
    } else {

      rowsStudentSubject.forEach((row) => {
        row.grade = helper.grade(row.score);
      })

      res.render("enrolledStudent", {dataStudentSubject: rowsStudentSubject, title: "Enrolled Students", role: req.session.role, username: req.session.username});
    }
  })
})

// Tampil halaman givescore
router.get("/subject/givescore/:id", (req, res) => {
  models.StudentSubject.findOne({include: [models.Subject, models.Student], attributes: ["id", "idStudent", "idSubject", "score"], where: {id:req.params.id}}).then((rowsStudentSubject) => {
    res.render("givescore", {dataStudentSubject: rowsStudentSubject, title: "Scoring", role: req.session.role, username: req.session.username})
  })
})

// Tambah score pada enrolledstudent
router.post("/subject/givescore/:id", (req, res) => {
  models.StudentSubject.update({score: req.body.score}, {where: { id: req.params.id}}).then(() => {
    res.redirect(`/subject/enrolledstudents/${req.body.id}`);
  })
})

// Tampil halaman tambah Subject
router.get("/subject/insert", (req, res) => {
  res.render("addSubject", {title: "Add Subject", role: req.session.role, username: req.session.username});
})

// Tambah data Subject
router.post("/subject/insert", (req, res) => {
  models.Subject.create({subjectName: req.body.subjectName}).then(() => {
    res.redirect("/subject");
  })
})

// Tampil Halaman edit Subject
router.get("/subject/edit/:id", (req, res) => {
  models.Subject.findById(req.params.id).then((rowSubject) => {
    res.render("editsubject", {dataSubject: rowSubject, title: "Edit Subject's Data", role: req.session.role, username: req.session.username})
  })
})

// Edit data Subject
router.post("/subject/edit/:id", (req, res) => {
  models.Subject.update({subjectName: req.body.subjectName}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/subject");
  })
})


// Hapus data Subject
router.get("/subject/delete/:id", (req,res) => {
  models.Subject.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/subject");
  })
})

module.exports = router;
