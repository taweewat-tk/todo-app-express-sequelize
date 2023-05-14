const db = require("../models");
const { Todo } = db;

const responseMessage = (data) => {
  return {
    message: "success",
    result: data,
  };
};

exports.getAllTodo = async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(responseMessage(todos));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    console.log("body: ", req.body);
    const todo = await Todo.create({
      title,
      description,
    });
    console.log("todo", todo);
    res.status(200).json(responseMessage(todo));
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isCompleted } = req.body;
    const todo = await Todo.update(
      {
        title,
        description,
        isCompleted,
      },
      {
        where: { id },
      }
    );
    res.status(200).json(responseMessage(todo));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.destroy({
      where: { id },
    });
    res.status(200).json(responseMessage(todo));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    res.status(200).json(responseMessage(todo));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
