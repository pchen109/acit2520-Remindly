const database = [
    {
      id: 1,
      name: "Jimmy Smith",
      email: "a@a",
      password: "123",
      reminders: [
        {
          id: 1,
          title: "Grocery shopping",
          description: "Buy milk and bread from safeway",
          imageUrl: "/uploads/grocery.JPG",
          completed: false,
        },
      ],
      role: "user",
    },
    {
      id: 2,
      name: "Johnny Doe",
      email: "b@b",
      password: "123",
      reminders: [
        {
          id: 1,
          title: "Grocery shopping",
          description: "Buy milk and bread from safeway",
          completed: false,
        },
      ],
      role: "admin",
    },
    {
      id: 3,
      name: "Jonathan Chen",
      email: "jonathan123@gmail.com",
      password: "jonathan123!",
    },
  ];
  
  const userModel = {
    findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
  };
  
  module.exports = { database, userModel };
  // module.exports = database;

  