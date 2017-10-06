const express = require("express");
const router = express.Router();
const models = require("../models");
const helper = require("../Helper/helper")

router.get("/subject", (req, res) => {
  models.Subject.findAll({include: [models.Teacher], limit:10}).then((rowsSubject) => {
    let message = null;
    if (req.query.message) {
      message = req.query.message;
    }
    // console.log(rowsSubject[0].Teachers[0].getFullName());
    res.render("subject", {dataSubject: rowsSubject, error: message});
  })
})

router.get("/subject/enrolledstudents/:id", (req, res) => {
  models.StudentSubject.findAll({include: [models.Subject, models.Student], attributes: ["id","idStudent","idSubject","score"], where:{idSubject: req.params.id}}).then((rowsStudentSubject) => {
    if (rowsStudentSubject.length === 0) {
      res.redirect("/subject?message=Sorry There's no Student in that Subject, Please Add Student First")
    } else {

      rowsStudentSubject.forEach((row) => {
        row.grade = helper.grade(row.score);
      })

      res.render("enrolledStudent", {dataStudentSubject: rowsStudentSubject});
    }
  })
})

router.get("/subject/givescore/:id", (req, res) => {
  models.StudentSubject.findOne({include: [models.Subject, models.Student], attributes: ["id", "idStudent", "idSubject", "score"], where: {id:req.params.id}}).then((rowsStudentSubject) => {
    res.render("givescore", {dataStudentSubject: rowsStudentSubject})
  })
})

router.post("/subject/givescore/:id", (req, res) => {
  models.StudentSubject.update({score: req.body.score}, {where: { id: req.params.id}}).then(() => {
    res.redirect(`/subject/enrolledstudents/${req.params.id}`);
  })
})

router.post("/subject/insert", (req, res) => {
  models.Subject.create({subjectName: req.body.subjectName}).then(() => {
    res.redirect("/subject");
  })
})

router.get("/subject/edit/:id", (req, res) => {
  models.Subject.findById(req.params.id).then((rowSubject) => {
    res.render("editsubject", {dataSubject: rowSubject})
  })
})

router.post("/subject/edit/:id", (req, res) => {
  models.Subject.update({subjectName: req.body.subjectName}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/subject");
  })
})

router.get("/subject/delete/:id", (req,res) => {
  models.Subject.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/subject");
  })
})

module.exports = router;
