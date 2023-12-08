const { database } = require("../models/userModel");
const sharp = require('sharp');

let remindersController = {
  list: (req, res) => res.render("reminder/index", { reminders: req.user.reminders }),

  new: (req, res) => res.render("reminder/create"),

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);

    const imageRandom = 'https://source.unsplash.com/random/?Cryptocurrency&1';

    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult, imageRandom });
    } else {
      res.render("reminder/index", { reminders: req.user.reminders });
    }
  },

  // abc: (req, res) => {
  //   // Pass the image path to the EJS template
  //   res.render('index', { imagePath: '/uploads/image.png' });
  // },

  create: (req, res) => {
    let path = ""
    if (req.file && req.file.filename) {
      path = '/uploads/' + req.file.filename
    }
    const { randomImageUrl } = req.body;
    let reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      imageUrl: path || randomImageUrl,
      completed: false,
    };
    req.user.reminders.push(reminder);
    res.redirect(`/reminders`);
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed === 'true';

    req.user.reminders[searchResult.id - 1] = searchResult;
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);
    let deletedIndex = searchResult.id - 1;
    if (deletedIndex > -1) req.user.reminders.splice(deletedIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
