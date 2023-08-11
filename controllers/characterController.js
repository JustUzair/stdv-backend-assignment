const catchAsync = require("../utils/catchAsync");
const AppError = require("./../utils/appErrors");
const Character = require("../models/characterModel");
const { createOne, updateOne, deleteOne, getOne } = require("./handlerFactory");
const fs = require("fs");

const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

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

exports.createCharacter =  catchAsync(async (req, res, next) => {
  console.log(req.user);
  //Create new document, from body passed in the req.body
  const newDoc = await Character.create({...req.body,createdBy:req.user.id});
  // Document created successfully, send acknowledgement and the new document
  res.status(201).json({
    status: "success",
    data: {
      data: newDoc,
    },
  });
});
exports.updateCharacter = updateOne(Character);
exports.deleteCharacter = deleteOne(Character);
exports.getCharacterById = getOne(Character, {
  path: "relations",
  select: "-_id -__v",
});

async function printPDF(currentUserId,role) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(`http://localhost:3000/characters/pdf-view/${currentUserId}&${role}`, {
    waitUntil: "networkidle0",
  });
  console.log("here");
  const pdf = await page.pdf({ format: "A4" });

  await browser.close();
  return pdf;
}

exports.getCharacterPDF = catchAsync(async (req, res, next) => {

  // console.log("getCharacterPDF",req.user.id);
  const pdf = await printPDF(req.user.id,req.user.role);
  res.set({ "Content-Type": "application/pdf", "Content-Length": pdf.length });
  res.setHeader("Content-Disposition", "attachment; filename=characters.pdf");
  res.send(pdf);
});

async function populateXLSX(req) {
  const characterBase = require("path").resolve(
    __dirname,
    "../docs/characters-base.xlsx"
  );
  const characters = require("path").resolve(
    __dirname,
    "../docs/characters.xlsx"
  );
  const workbook = await XLSX.readFile(characterBase);
  const worksheets = {};

  for (const sheetName of workbook.SheetNames) {
    worksheets[sheetName] = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheetName]
    );
  }

  const charactersData = await Character.find({});

  if (charactersData) {
    charactersData.map(character => {
      worksheets.Sheet1.push({
        CharacterID: character._id.toString(),
        Name: character.name,
        Age: character.age,
        Gender: character.gender,
        Occupation: character.occupation,
        Relations: character.relations.join(" ; "),
        Photos: character.photos
          .map(photo => {
            return `http://${req.host}:${
              process.env.PORT || 3000
            }/img/${photo}`;
          })
          .join(" ; "),
      });
    });
  }
  //   console.log(charactersData);
  XLSX.utils.sheet_add_json(workbook.Sheets["Sheet1"], worksheets.Sheet1);

  //   XLSX.writeFile(workbook, characters);
  XLSX.writeFileXLSX(workbook, characters, {});
}

exports.getXLSXData = catchAsync(async (req, res, next) => {
  //   console.log(require("path").resolve(__dirname, "../docs/characters.xlsx"));
  await populateXLSX(req);
  const characters = require("path").resolve(
    __dirname,
    "../docs/characters.xlsx"
  );
  //   XLSX.write(workbook, { bookType: "xlsx", type: "base64" });
  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=characters.xlsx");
  const stream = fs.createReadStream(characters); // create read stream
  stream.pipe(res);
});

exports.getCSVData = catchAsync(async (req, res, next) => {
  const characters = require("path").resolve(
    __dirname,
    "../docs/characters.xlsx"
  );
  const charactersCSV = require("path").resolve(
    __dirname,
    "../docs/characters-csv.csv"
  );
  await populateXLSX(req);
  const workBook = XLSX.readFile(characters);
  XLSX.writeFile(workBook, charactersCSV, { bookType: "csv" });
  res.setHeader("Content-Type", "text/csv");
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=characters-csv.csv"
  );
  const stream = fs.createReadStream(charactersCSV); // create read stream
  stream.pipe(res);
});
