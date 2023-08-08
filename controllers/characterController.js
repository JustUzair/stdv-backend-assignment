const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appErrors");
const Character = require("../models/characterModel");
const { createOne, updateOne, deleteOne, getOne } = require("./handlerFactory");
exports.getAllCharacters = catchAsync(async (req, res, next) => {
  const characters = await Character.find({}).populate({
    path: "relations", // field in character Model object
    select: "-_id -__v",
  });
  res.status(200).json({
    status: "success",
    data: {
      characters,
    },
  });
});

exports.createCharacter = createOne(Character);
exports.updateCharacter = updateOne(Character);
exports.deleteCharacter = deleteOne(Character);
exports.getCharacterById = getOne(Character, {
  path: "relations",
  select: "-_id -__v",
});
