const { database, userModel } = require("../models/userModel");
session = require("express-session")
const FileStore = require("session-file-store")(session);
const sessionStore = new FileStore();
const fs = require('fs');
const path = require('path');

const sessionFolderPath = './sessions';


let adminController = {
    // list: (req, res) => {
    //     // sessionStore.all((err, sessions) => {
    //     //     if (err) {
    //     //       // Handle error appropriately
    //     //       console.error('Error retrieving sessions:', err);
    //     //       return;
    //     //     }
    //     //     console.log(sessions);
    //     // });

    //     sessionId = req.session.id
    //     userId = req.user
    //     res.render("admin/admin", {data: req.user.name, userId: req.user.id, session: sessionId});
    // },

    list: (req, res) => {
        // Read files in the session folder
        fs.readdir(sessionFolderPath, (err, files) => {
            if (err) {
                // Handle error appropriately
                console.error('Error reading session folder:', err);
                return;
            }

            const sessionFiles = files.filter(file => file.endsWith('.json')); // Assuming sessions are stored as JSON files

            const sessions = [];
            sessionFiles.forEach(file => {
                const filePath = path.join(sessionFolderPath, file);
                const sessionData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                sessions.push(sessionData);
            });

            // 'sessions' will contain data from session files
            console.log('Retrieved sessions:', sessions);

            

            // Render your view or handle data as needed
            sessionId = req.session.id;
            userId = req.user;
            res.render("admin/admin", { data: req.user.name, userId: req.user.id, session: sessionId, allSessions: sessions });
        });
    },
};

module.exports = adminController;
