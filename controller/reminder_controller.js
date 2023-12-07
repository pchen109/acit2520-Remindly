const { database } = require("../models/userModel");

let remindersController = {
  list: (req, res) => res.render("reminder/index", { reminders: req.user.reminders }),

  new: (req, res) => res.render("reminder/create"),

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[0].reminders.find(reminder => reminder.id == reminderToFind);
    // const { image } = req.files;
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders, image });
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
    let searchResult = database[0].reminders.find(reminder => reminder.id == reminderToFind);
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[0].reminders.find(reminder => reminder.id == reminderToFind);
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed === 'true';

    database[0].reminders[searchResult.id - 1] = searchResult;
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[0].reminders.find(reminder => reminder.id == reminderToFind);
    let deletedIndex = searchResult.id - 1;
    if (deletedIndex > -1) database[0].reminders.splice(deletedIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
