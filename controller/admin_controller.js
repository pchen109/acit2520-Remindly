const { database } = require("../models/userModel");
const fs = require('fs');
const path = require('path');

const sessionFolderPath = './sessions';

let adminController = {
    displayAdminSessions: (req, res) => {
        req.sessionStore.all((err, sessions) => {
            if (err) return console.error('Error retrieving sessions:', err);
            const sessionKeys = Object.keys(sessions)
            res.render("admin/admin", {data: req.user.name, keys: sessionKeys, sessions});
        });
    },
    revokeSession: (req, res) => {
        const sessionId = req.params.sessionId;
        req.sessionStore.destroy(sessionId, (err) => {
            if (err) {
                res.status(500).send('Error revoking session');
            } else {
                res.redirect('/admin?message=Session+revoked+successfully');
            }
        });
    },
};

module.exports = adminController;
