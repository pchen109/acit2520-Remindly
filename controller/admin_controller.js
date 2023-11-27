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
                const sessionData = JSON.parse(fs.readFileSync(filePath, 'utf8')).passport.user;
                database.forEach(
                    item => {
                        if (item.id === sessionData) {
                            const fileNameWithoutExtension = path.parse(file).name;
                            sessions.push({ id: item.id, session: fileNameWithoutExtension });
                        }
                    }
                )
                // sessions.push(sessionData);
            });
            userId = req.user;
            res.render("admin/admin", { data: req.user.name, userId: req.user.id, allSessions: sessions });
        });
    },
};

module.exports = adminController;
