const express = require("express");
const router = express.Router();
const helper = require("../Helper/helper.js");
const models = require("../models");

function login (req, res, next) {
	models.User.findOne({where: {username: req.body.username}}).then((rowsUser) => {
		if (rowsUser) {
			let passCek = helper.secretHash(rowsUser.secret, req.body.password);
			if (passCek === rowsUser.password) {
				req.session.username = req.body.username;
				req.session.role = rowsUser.role;
				next();
			} else {
				res.redirect("/?message=Wrong password");
			}
		} else {
			res.redirect("/?message=Wrong username");
		}
	})
}

// Tampil Halaman index
router.get("/", function(req, res) {
	let msg = null;

	if (req.query.message) {
		msg = req.query.message;
	}

	res.render("index", {title: "Home", error: msg, role: req.session.role, username: req.session.username});
})

// Tampil halaman Register
router.get("/register", (req, res) => {
	let msg = null;

	if (req.query.message) {
		msg = req.query.message;
	}

	res.render("register", {title: "Register", error: msg, role: req.session.role});
})

// Tambah User
router.post("/register", (req, res) => {
	let secretCode = helper.secretShuffle();

	models.User.create({username: req.body.username, password: req.body.password, role: req.body.role, secret: secretCode}).then(() => {
		req.session.username = req.body.username;
		req.session.role = req.body.role;
		res.redirect("/");
  }).catch((reason) => {
    res.redirect("/register?message="+reason.errors[0].message);
  })
})

// Login
router.post("/login", login, (req, res) => {
	res.redirect("/");
})

// Logout
router.use("/logout", (req, res) => {
	req.session.destroy();
	res.redirect("/");
})

module.exports = router;
