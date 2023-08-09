const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appErrors");
const Character = require("../models/characterModel");
const { createOne, updateOne, deleteOne, getOne } = require("./handlerFactory");
const puppeteer = require("puppeteer");

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

async function printPDF() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/characters/pdf-view`, {
    waitUntil: "networkidle0",
  });
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

exports.getCharacterPDF = catchAsync(async (req, res, next) => {
  const pdf = await printPDF();
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.send(pdf);
});
