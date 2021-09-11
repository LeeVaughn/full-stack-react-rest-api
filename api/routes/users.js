const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authenticateUser");
const bcryptjs = require("bcryptjs");
const User = require("../models").User;
// const Sequelize = require('sequelize');

// handler function to wrap each route
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
}

// returns the currently authenticated user
router.get("/", authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;

  res.json({
    "id": `${user.id}`,
    "firstName": `${user.firstName}`,
    "lastName": `${user.lastName}`,
    "emailAddress": `${user.emailAddress}`
  });
}));

// creates a new user
router.post("/", asyncHandler(async (req, res) => {
  let user = req.body;

  if (user.password) {
    user.password = bcryptjs.hashSync(user.password);
  }

  try {
    user = await User.create(user);

    res.status(201).location("/").end();
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // iterates over error to create an array of error messages
      const errors = error.errors.map(err => err.message);

      res.status(400).json(errors);
    } else if (error.name === "SequelizeUniqueConstraintError") {
      // iterates over error to create an array of error messages
      const errors = error.errors.map(err => err.message);

      res.status(400).json(errors);
    } else {
      // handled by asyncHandler's catch block
      throw error;
    }
  }
}));

module.exports = router;
