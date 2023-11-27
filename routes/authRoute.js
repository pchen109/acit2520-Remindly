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
        failureRedirect: "/auth/login",
    }),
    function(req, res) {
        // Custom logic for redirection after successful login
        if (req.user.role == 'admin') {
            res.redirect("/admin");
        } else {
            res.redirect("/reminders"); // Redirect to the reminders page for regular users
        }
    }
);


router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/auth/login");
});

module.exports = router;
