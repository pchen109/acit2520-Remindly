const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

// router.post("/login", (req, res) => {
//   // 1) get email and password from browser
//   // 2) Talk to database to verify
//   // 3) Create a session with express session
//   // 4) Redicrect User to Dashboard
// })

// Don't need these 4 steps when using the middleware funciton passport.authenticate()
// Instead only need router.post(...); below

router.post(
	"/login",
	passport.authenticate("local", {
		successRedirect: "/reminders",
		failureRedirect: "/auth/login",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/auth/login");
});

module.exports = router;
