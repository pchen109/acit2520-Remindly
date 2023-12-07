const database = require("../../models/userModel");

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        res.render("auth/register");
    },

    loginSubmit: (req, res, next) => {
        // implement later
        if (req.isAuthenticated()) {
            console.log('abc')
            return next()
        }
        res.redirect("/auth/login")
    },

    registerSubmit: (req, res) => {
        // implement later
        res.redirect("/register")
    },
};

module.exports = authController;
