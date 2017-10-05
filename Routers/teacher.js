const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/teacher", (req, res) => {
  models.Teacher.findAll({limit:10}).then((rowsTeacher) => {
    res.render("teacher", {dataTeacher: rowsTeacher});
  })
})

router.post("/teacher/insert", (req, res) => {
  models.Teacher.create({firstName: req.body.firstName, lastName:req.body.lastName, email:req.body.email}).then(() => {
    res.redirect("/teacher");
  })
})

// router.get("/teacher/edit/:id", (req, res) => {
//   models.Teacher.findOne({where: {id: req.params.id}}).then((rowTeacher) => {
//     res.render("editteacher", {dataTeacher: rowTeacher})
//   })
// })

router.get("/teacher/edit/:id", (req, res) => {
  models.Teacher.findById(req.params.id).then((rowTeacher) => {
    res.render("editteacher", {dataTeacher: rowTeacher})
  })
})

router.post("/teacher/edit/:id", (req, res) => {
  models.Teacher.update({firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email}, {where: {id: req.params.id}}).then(() => {
    res.redirect("/teacher");
  })
})

router.get("/teacher/delete/:id", (req,res) => {
  models.Teacher.destroy({where: {id: req.params.id} }).then(() => {
    res.redirect("/teacher");
  })
})

module.exports = router;
