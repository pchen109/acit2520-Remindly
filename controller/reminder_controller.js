let remindersController = {
  list: (req, res) => res.render("reminder/index", { reminders: req.user.reminders }),

  new: (req, res) => res.render("reminder/create"),

  listOne: (req, res) => {
    const reminderToFind = req.params.id;
    const searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);

    if (searchResult != undefined) return res.render("reminder/single-reminder", { reminderItem: searchResult});
    else res.render("reminder/index", { reminders: req.user.reminders });
  },

  create: (req, res) => {
    const { randomImageUrl } = req.body;
    let imagePath = "";
    if (req.file && req.file.filename) imagePath = '/uploads/' + req.file.filename;
    else imagePath = randomImageUrl;
    
    const reminder = {
      id: req.user.reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      imageUrl: imagePath,
      completed: false,
    };

    req.user.reminders.push(reminder);
    res.redirect(`/reminders`);
  },

  edit: (req, res) => {
    const reminderToFind = req.params.id;
    const searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    const reminderToFind = req.params.id;
    const searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);
    searchResult.title = req.body.title;
    searchResult.description = req.body.description;
    searchResult.completed = req.body.completed === 'true';
    req.user.reminders[searchResult.id - 1] = searchResult;
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    const reminderToFind = req.params.id;
    const searchResult = req.user.reminders.find(reminder => reminder.id == reminderToFind);
    const deletedIndex = searchResult.id - 1;
    if (deletedIndex > -1) req.user.reminders.splice(deletedIndex, 1);
    res.redirect("/reminders");
  },
};

module.exports = remindersController;
