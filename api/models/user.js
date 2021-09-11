"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class User extends Sequelize.Model {}

  User.init({
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "First Name is required"
        },
        notNull: {
          msg: "Request must contain a First Name"
        }
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Last Name is required"
        },
        notNull: {
          msg: "Request must contain a Last Name"
        }
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Email Address is required"
        },
        notNull: {
          msg: "Request must contain an Email Address"
        },
        isEmail: {
          msg: "Please provide a valid Email Address"
        }
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        notNull: {
          msg: "Request must contain a Password"
        }
      }
    }
  }, { sequelize });

  User.associate = (models) => {
    User.hasMany(models.Course, { foreignKey: "userId" });
  };

  return User;
}