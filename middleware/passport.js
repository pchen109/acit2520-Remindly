const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const localLogin = new LocalStrategy(
	{
		usernameField: "email",
		passwordField: "password",
	},
	(email, password, done) => {
		const user = userController.getUserByEmailIdAndPassword(email, password);
		return user
			? done(null, user)		// req.user = user
			: done(null, false, {
				message: "Your login details are not valid. Please try again",
			});
	}
);

passport.serializeUser( (user, done) => {
	done(null, user.id);
});

passport.deserializeUser( (id, done) => {
	const user = userController.getUserById(id);
	if (user) done(null, user);
	else done({ message: "User not found" }, null);
});

module.exports = passport.use(localLogin);