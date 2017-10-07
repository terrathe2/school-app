const express = require("express");
const router = express.Router();
const models = require("../models");

// Tampil Data Teacher + Subject
router.get("/teacher", (req, res) => {
  models.Teacher.findAll({include:[models.Subject], order: [["firstName", "ASC"]]}).then((rowsTeacher) => {
    models.Subject.findAll().then((rowsSubject) => {

      let message = null;
      if (req.query.message) {
        message = req.query.message;
      }
    //
    //   let arr = [];
    //   rowsTeacher.forEach((rowTeacher) => {
    //     arr.push(rowTeacher.getSubject());
    //   })
    //   Promise.all(arr)
    //   .then((results) => {
    //     results.forEach((rowSubject, index) => {
    //       if(rowSubject && rowsTeacher[index].idSubject == rowSubject.id) {
    //         rowsTeacher[index].subjectName = rowSubject.subjectName;
    //       } else {
    //         rowsTeacher[index].subjectName = "Unassigned";
    //       }
    //     })
        res.render("teacher", {dataTeacher: rowsTeacher, dataSubject: rowsSubject, error: message, title: "Teachers"});
    //   })
    })
  })
})

// Tampil halaman tambah Teacher
router.get("/teacher/insert", (req, res) => {
  models.Subject.findAll().then((rowsSubject) => {
    res.render("addTeacher", {dataSubject: rowsSubject, title: "Add Teacher"});
  })
})

// Tambah data Teacher
router.post("/teacher/insert", (req, res) => {
  models.Teacher.create({firstName: req.body.firstName, lastName:req.body.lastName, email:req.body.email, idSubject: req.body.idSubject}).then(() => {
    res.redirect("/teacher");
  }).catch((reason) => {
    res.redirect("/teacher?message="+reason.errors[0].message);
  })
})

// Tampil halaman edit Teacher
router.get("/teacher/edit/:id", (req, res) => {
  models.Teacher.findById(req.params.id).then((rowTeacher) => {
    models.Subject.findAll().then((rowsSubject) => {
      res.render("editteacher", {dataTeacher: rowTeacher, dataSubject: rowsSubject, title: "Edit Teacher's Data"});
    })
  })
})

// Edit data Teacher
router.post("/teacher/edit/:id", (req, res) => {
  models.Teacher.update({id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, idSubject: req.body.idSubject}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/teacher");
  }).catch((reason) => {
    // console.log(reason.errors[0].message);
    res.redirect("/teacher?message="+reason.errors[0].message);
  })
})

// Hapus data Teacher
router.get("/teacher/delete/:id", (req,res) => {
  models.Teacher.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/teacher");
  })
})

module.exports = router;
