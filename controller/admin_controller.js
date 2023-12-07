const { database } = require("../models/userModel");
const fs = require('fs');
const path = require('path');

const sessionFolderPath = './sessions';

let adminController = {
    displayAdminSessions: (req, res) => {
        fs.readdir(sessionFolderPath, (err, files) => {
            if (err) {
                console.error('Error reading session folder:', err);
                return;
            }
            const sessionFiles = files.filter(file => file.endsWith('.json'));
            const sessions = [];
            sessionFiles.forEach(file => {
                const filePath = path.join(sessionFolderPath, file);
                const sessionData = JSON.parse(fs.readFileSync(filePath, 'utf8')).passport.user;
                database.forEach(item => {
                    if (item.id === sessionData) {
                        const fileNameWithoutExtension = path.parse(file).name;
                        sessions.push({ id: item.id, session: fileNameWithoutExtension });
                    }
                });
            });
            res.render("admin/admin", { data: req.user.name, userId: req.user.id, allSessions: sessions, message: req.query.message });
        });
    },
    revokeSession: (req, res) => {
        const sessionId = req.params.sessionId;
        req.sessionStore.destroy(sessionId, (err) => {
            if (err) {
                res.status(500).send('Error revoking session');
            } else {
                // res.send('Session revoked successfully');
                res.redirect('/admin?message=Session+revoked+successfully');
            }
        });
    },
};

module.exports = adminController;
