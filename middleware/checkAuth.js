// Use these functions before a route

module.exports = {
	// if authenticated, call the call-back fun (next())
	// if not authenticated, redirect back to login page
	// Show content accessible only by logged-in user
	ensureAuthenticated: function (req, res, next) {
		// isAuthenticated() is built-in method from https://www.passportjs.org/
		if (req.isAuthenticated()) {
			// next() is a call-back func
			return next();
		}
		res.redirect("/auth/login");
	},

	isAdmin: function(req, res, next) {
		if (req.user.role === 'admin') {
			return next();
		}
		res.status(403).send('Access Forbidden');
	},

	// Show content accessible to guests
	forwardAuthenticated: function (req, res, next) {
		if (!req.isAuthenticated()) {
			return next();
		}
		if (req.user.role == 'admin') {
			return res.redirect("/admin")
		}
		res.redirect("/reminders");
	},
};