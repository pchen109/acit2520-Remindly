let authController = {
  login: (req, res) => res.render("auth/login"),

  register: (req, res) => res.render("auth/register"),

  loginSubmit: (req, res, next) => req.isAuthenticated() ? next() : res.redirect("/auth/login"),

  registerSubmit: (req, res) => res.redirect("/register"),
};

module.exports = authController;
