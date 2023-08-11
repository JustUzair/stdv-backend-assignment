const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appErrors");
const User = require("./../models/userModel");
const Character = require("./../models/characterModel");

const { readdir } = require("fs");
const crypto = require("crypto");

/*
  |--------------------------------------------|
  |         Render Artist Overview Page        |
  |--------------------------------------------|
*/
exports.getAllCharacters = catchAsync(async (req, res, next) => {
  //Renders all the users with role = artist
  console.log(req.params);
  const userId = req.params.id;
  const role = req.params.role;
  if (userId === undefined) {
    res.status(200).render("characters", {
      title: "All Characters",
      characters: [],
    });
  }
  if (userId) {
    const characters = (
      role === "admin"
        ? await Character.find({}).populate({
          path: "relations", // field in character Model object
          select: "-_id -__v",
        })
        : await Character.find({ createdBy: userId }).populate({
          path: "relations", // field in character Model object
          select: "-_id -__v",
        })
    );
    // console.log(userId);
    res.status(200).render("characters", {
      title: "All Characters",
      characters,
    });
  }
});
