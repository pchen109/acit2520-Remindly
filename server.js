//////////////////////////////////////////////////////
//////      Dependencies and Setup      /////////////
/////////////////////////////////////////////////////
const express = require("express");
const ejsLayouts = require("express-ejs-layouts");
const path = require("path");
const passport = require("./middleware/passport");
const session = require("express-session");
const app = express();

// Static files, URL encoding, and EJS as the template engine
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.set("view engine", "ejs");

const FileStore = require("session-file-store")(session);
const fileStoreOptions = {
    path: './sessions'
};


app.use(
    session({
        secret: "secret",
        store: new FileStore(fileStoreOptions),
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.get('/active-sessions', (req, res) => {
    const sessionStore = req.sessionStore; // Access the existing session store
    sessionStore.length((err, count) => {
        if (err) {
            console.error('Error retrieving sessions:', err);
            res.status(500).send('Error retrieving sessions');
        } else {
            res.send(`Active Sessions: ${count}`);
        }
    });
});


// Body parsing, Passport initialization, and logging middleware
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


/////////////////////////////////////////////////////////////
/////////    Login Page     ////////////////////
////////////////////////////////////////////////////////////
const authController = require("./controller/auth_controller");

// User authentication routes
app.get("/register", authController.register);
app.get("/login", authController.login);
app.post("/register", authController.registerSubmit);
app.post("/login", authController.loginSubmit);


//////////////////////////////////////////////////////////////
//////////  Reminder Routes and CRUD Operations  ////////////
/////////////////////////////////////////////////////////////
const reminderController = require("./controller/reminder_controller");
const adminController = require("./controller/admin_controller");
const { ensureAuthenticated, isAdmin } = require("./middleware/checkAuth");

// Admin Route
// when you define multiple routes with the same URL pattern and HTTP method, only the first route that matches the pattern will be executed
app.get("/admin", ensureAuthenticated, isAdmin, adminController.displayAdminSessions);
// Endpoint to revoke session
app.get('/revoke-session/:sessionId', adminController.revokeSession);


// Reminder Routes
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.get("/reminder/new", ensureAuthenticated, reminderController.new);
app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);
app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);
app.post("/reminder/", reminderController.create);

// CRUD Operations for Reminders
app.post("/reminder/update/:id", reminderController.update);
app.post("/reminder/delete/:id", reminderController.delete);

const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
// Authentication Routes
// app.use("/", indexRoute);      //still need this?
app.use("/auth", authRoute);

////////////////////////////////////////////////////
//////////// Server Initialization /////////////////
////////////////////////////////////////////////////
app.listen(3001, function () {
    console.log(
        "Server running. Visit: http://localhost:3001/login in your browser 🚀"
    );
});