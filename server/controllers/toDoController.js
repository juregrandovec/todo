const ToDo = require("../models/ToDoList");

exports.createToDo = async (req, res) => {
  try {
    const data = req.body;
    const todo = new ToDo(data);
    const result = await todo.save();

    res.status(201).send({ message: "Created new task" });
  } catch (err) {
    res.status(err);
  }
};
