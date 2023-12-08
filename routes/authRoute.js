const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");

const router = express.Router();
router.get("/login", forwardAuthenticated, (req, res) => res.render("auth/login"));

router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login",
    }),
    (req, res) => {
        if (req.user.role == 'admin') return res.redirect("/admin");
        else return res.redirect("/reminders");
    }
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/auth/login");
});

module.exports = router;
