const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/student", (req, res) => {
  models.Student.findAll({include:[models.Subject], limit:10}).then((rowsStudent) => {
    let message = null;
    if(req.query.message){
      message = req.query.message;
    }
    res.render("student", {dataStudent: rowsStudent, error: message});
  }).catch((reason) => {
    console.log(reason);
  })
})

router.get("/student/addsubject/:id", (req, res) => {
  models.Student.findById(req.params.id).then((rowsStudent) => {
    models.Subject.findAll().then((rowsSubject) => {
      res.render("addSubject", {dataStudent: rowsStudent, dataSubject: rowsSubject})
    })
  })
})

router.post("/student/addsubject/:id", (req, res) => {
  models.StudentSubject.create({idSubject: req.body.idSubject, idStudent: req.params.id}).then(() => {
    res.redirect("/student");
  })
})

router.post("/student/insert", (req, res) => {
  models.Student.create({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}).then(() => {
    res.redirect("/student");
  }).catch((reason) => {
    res.redirect("/student?message="+reason);
  })
})

router.get("/student/edit/:id", (req, res) => {
  models.Student.findById(req.params.id).then((rowStudent) => {
    res.render("editstudent", {dataStudent: rowStudent})
  })
})

router.post("/student/edit/:id", (req, res) => {
  models.Student.update({id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/student");
  }).catch((reason) => {
    res.redirect("/student?message="+reason);
  })
})

router.get("/student/delete/:id", (req,res) => {
  models.Student.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/student");
  })
})

module.exports = router;
