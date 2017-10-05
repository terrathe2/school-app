const express = require("express");
const router = express.Router();
const models = require("../models");

router.get("/student", (req, res) => {
  models.Student.findAll({limit:10}).then((rowsStudent) => {
    let masa = null;
    if(req.query.message){
      masa = req.query.message;
    }
    res.render("student", {dataStudent: rowsStudent, error: masa});
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
