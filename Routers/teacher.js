const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/teacher", (req, res) => {
  models.Teacher.findAll({include:[models.Subject], limit:10}).then((rowsTeacher) => {
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
        res.render("teacher", {dataTeacher: rowsTeacher, dataSubject: rowsSubject, error: message});
    //   })
    })
  })
})

router.post("/teacher/insert", (req, res) => {
  models.Teacher.create({firstName: req.body.firstName, lastName:req.body.lastName, email:req.body.email, idSubject: req.body.idSubject}).then(() => {
    res.redirect("/teacher");
  }).catch((reason) => {
    res.redirect("/teacher?message="+reason);
  })
})

// router.get("/teacher/edit/:id", (req, res) => {
//   models.Teacher.findOne({where: {id: req.params.id}}).then((rowTeacher) => {
//     res.render("editteacher", {dataTeacher: rowTeacher})
//   })
// })

router.get("/teacher/edit/:id", (req, res) => {
  models.Teacher.findById(req.params.id).then((rowTeacher) => {
    models.Subject.findAll().then((rowsSubject) => {
      res.render("editteacher", {dataTeacher: rowTeacher, dataSubject: rowsSubject});
    })
  })
})

router.post("/teacher/edit/:id", (req, res) => {
  models.Teacher.update({id: req.params.id, firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, idSubject: req.body.idSubject}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/teacher");
  }).catch((reason) => {
    res.redirect("/teacher?message="+reason);
  })
})

router.get("/teacher/delete/:id", (req,res) => {
  models.Teacher.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/teacher");
  })
})

module.exports = router;
