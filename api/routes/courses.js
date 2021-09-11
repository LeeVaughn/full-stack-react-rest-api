const express = require("express");
const router = express.Router();
const Course = require("../models").Course;
const User = require("../models").User;
const authenticateUser = require("../middleware/authenticateUser");
// const Sequelize = require('sequelize');

// handler function to wrap each route
function asyncHandler(cb) {
  return async(req, res, next) => {
    try {
      await cb(req, res, next)
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

// returns a list of all courses and the user that they belong to
router.get("/", asyncHandler(async (req, res) => {
  const courses = await Course.findAll({
    include: [{ model: User, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }],
    attributes: { exclude: ["createdAt", "updatedAt"] }
  });

  res.json(courses);
}));

// returns a specific course and the user it belongs to based on the provided course id
router.get("/:id", asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    include: [{ model: User, attributes: { exclude: ["password", "createdAt", "updatedAt"] } }],
    attributes: { exclude: ["createdAt", "updatedAt"] }
  });

  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ "message": "Course not found" });
  }
}));

// creates a new course
router.post("/", authenticateUser, asyncHandler(async (req, res) => {
  let course = req.body;

  try {
    course = await Course.create(course);

    res.status(201).location(`/courses/${course.id}`).end();
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // iterates over error to create an array of error messages
      const errors = error.errors.map(err => err.message);

      res.status(400).json(errors);
    } else {
      // handled by asyncHandler's catch block
      throw error;
    }
  }
}));

// updates a specific course based on the provided course id
router.put("/:id", authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  let course;

  try {
    course = await Course.findByPk(req.params.id);

    // if course was successfully retrieved and current user and course user are the same...
    // else if course owner is not the same as the current user...
    // else the course was found...
    if (course && course.userId == user.id) {
      await course.update(req.body);

      res.status(204).end();
    } else if (course.userId != user.id) {
      res.status(403).json({ "message": "You do not own the requested course" });
    } else {
      res.status(404).json({ "message": "Course not found" });
    }
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      // iterates over error to create an array of error messages
      const errors = error.errors.map(err => err.message);

      res.status(400).json(errors);
    } else {
      // handled by asyncHandler's catch block
      throw error;
    }
  }
}));

// deletes a specific course based on the provided course id
router.delete("/:id", authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  let course;

  try {
    course = await Course.findByPk(req.params.id);

    // if course was successfully retrieved and current user and course user are the same...
    // else if course owner is not the same as the current user...
    if (course && course.userId == user.id) {
      await course.destroy();

      res.status(204).end();
    } else if (course.userId != user.id) {
      res.status(403).json({ "message": "You do not own the requested course" });
    }
  } catch (error) {
    // handled by asyncHandler's catch block
    throw error;
  }
}));

module.exports = router;
