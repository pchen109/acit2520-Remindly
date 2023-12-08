const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const passport = require("./middleware/passport");
const session = require("express-session");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

app.use(
    session({
        secret: "secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(`User details are: `);
    console.log(req.user);

    console.log("Entire session object:");
    console.log(req.session);

    console.log(`Session details are: `);
    console.log(req.session.passport);

    next();
});

// IMAGE /////////////////////////////////////////////
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' })
//////////////////////////////////////////////////////

const authController = require("./controller/auth_controller");

// User authentication routes
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);

const reminderController = require("./controller/reminder_controller");
const adminController = require("./controller/admin_controller");
const { ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");

// Admin Route
app.get("/admin", ensureAuthenticated, isAdmin, adminController.displayAdminSessions);
app.get('/revoke-session/:sessionId', adminController.revokeSession);

// Reminder Routes
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

// CRUD Operations for Reminders
app.post("/reminder/", ensureAuthenticated, upload.single('image'), reminderController.create);
app.post("/reminder/update/:id", ensureAuthenticated, reminderController.update);
app.post("/reminder/delete/:id", ensureAuthenticated, reminderController.delete);



const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
app.use("/", indexRoute);
app.use("/auth", authRoute);


app.listen(3001, function () {
    console.log(
        "Server running. Visit: http://localhost:3001/login in your browser 🚀"
    );
});