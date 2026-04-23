const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Task = sequelize.define("Task", {
  title: DataTypes.STRING,

  status: {
    type: DataTypes.ENUM("pending", "completed"),
    defaultValue: "pending",
  },

  dueDate: {
    type: DataTypes.DATEONLY,
  },
});

module.exports = Task;