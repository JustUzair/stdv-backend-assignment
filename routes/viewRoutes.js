const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");


router.get("/pdf-view/:id&:role",viewController.getAllCharacters); //ROOT URL - Render Home page

module.exports = router;