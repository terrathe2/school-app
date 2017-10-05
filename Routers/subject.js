const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/subject", (req, res) => {
  models.Subject.findAll({limit:10}).then((rowsSubject) => {
    res.render("subject", {dataSubject: rowsSubject});
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
