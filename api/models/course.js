"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Course extends Sequelize.Model {}

  Course.init({
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Title is required"
        },
        notNull: {
          msg: "Request must contain a Title"
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Description is required"
        },
        notNull: {
          msg: "Request must contain a Description"
        }
      }
    },
    estimatedTime: Sequelize.STRING,
    materialsNeeded: Sequelize.STRING
  }, { sequelize });

  Course.associate = (models) => {
    Course.belongsTo(models.User, { foreignKey: "userId" });
  };

  return Course;
}