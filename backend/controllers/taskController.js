const { Task } = require("../models");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Title required" });
    }

    const task = await Task.create({
      title,
      dueDate: dueDate || null,
      UserId: req.user.id,
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.UserId !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    const { status, dueDate } = req.body;

    if (status) task.status = status;
    if (dueDate !== undefined) task.dueDate = dueDate;

    await task.save();

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);

    if (!task || task.UserId !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await task.destroy();

    res.json({ msg: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};