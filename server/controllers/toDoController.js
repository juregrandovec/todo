const ToDo = require("../models/ToDoList");

exports.create = async (req, res) => {
  try {
    const data = req.body;
    const todo = new ToDo(data);
    const result = await todo.save();

    res.status(201).send({ message: "Created new task", id: result.id });
  } catch (err) {
    res.status(err);
  }
};

exports.list = async (req, res) => {
  let { type, userId } = req.params;
  console.log(type);
  try {
    const result = await ToDo.find({
      createdBy: userId,
      isCompleted: type == "Completed",
    });
    res.send(result);
  } catch (err) {
    res.status(err);
  }
};

exports.update = async (req, res) => {
  let { id } = req.params;
  const data = req.body;
  try {
    const result = await ToDo.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );
    res.send(result);
  } catch (err) {
    res.status(err);
  }
};

exports.deleteTodo = async (req, res) => {
  let { id } = req.params;
  try {
    const result = await ToDo.findByIdAndDelete(id);
    res.send({ message: result ? "success" : "failed" });
  } catch (err) {
    res.status(err);
  }
};
