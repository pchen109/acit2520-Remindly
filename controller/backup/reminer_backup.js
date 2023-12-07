const { database, userModel } = require("../../models/userModel");

let remindersController = {
    list: (req, res) => {
        res.render("reminder/index", { reminders: database[0].reminders });
    },

    new: (req, res) => {
        res.render("reminder/create");
    },

    listOne: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database[0].reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        if (searchResult != undefined) {
            res.render("reminder/single-reminder", { reminderItem: searchResult });
        } else {
            res.render("reminder/index", { reminders: database[0].reminders });
        }
    },

    create: (req, res) => {
        let reminder = {
            id: database[0].reminders.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: false,
        };
        database[0].reminders.push(reminder);
        res.redirect("/reminders");
    },

    edit: (req, res) => {
        let reminderToFind = req.params.id;
        let searchResult = database[0].reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        res.render("reminder/edit", { reminderItem: searchResult });
    },

    update: (req, res) => {
        // implementation here 👈
        let reminderToFind = req.params.id;
        let searchResult = database[0].reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        searchResult.title = req.body.title;
        searchResult.description = req.body.description;
        searchResult.completed = req.body.completed === 'true';

        database[0].reminders[searchResult.id - 1] = searchResult;
        res.redirect("/reminders")
    },

    delete: (req, res) => {
        // implementation here 👈
        let reminderToFind = req.params.id;
        let searchResult = database[0].reminders.find(function (reminder) {
            return reminder.id == reminderToFind;
        });
        let deletedIndex = searchResult.id - 1;
        if (deletedIndex > -1) { // only splice array when item is found
            database[0].reminders.splice(deletedIndex, 1); // 2nd parameter means remove one item only
        }
        res.redirect("/reminders");
    },
};

module.exports = remindersController;
