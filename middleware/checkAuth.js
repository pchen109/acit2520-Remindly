module.exports = {
	ensureAuthenticated: function (req, res, next) {
		if (req.isAuthenticated()) return next();
		res.redirect("/auth/login");
	},

	isAdmin: function(req, res, next) {
		if (req.user.role === 'admin') return next();
		res.status(403).send('Access Forbidden');
	},

	forwardAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) return next();
		if (req.user.role == 'admin') return res.redirect("/admin");
		res.redirect("/reminders");
	},
};