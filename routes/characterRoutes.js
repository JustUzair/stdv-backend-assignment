const router = require("express").Router();
const authController = require("../controllers/authController");
const characterController = require("../controllers/characterController");
router.get("/get-pdf", characterController.getCharacterPDF);
router.get("/get-xlsx", characterController.getXLSXData);
router.get("/get-csv", characterController.getCSVData);

router.get("/", characterController.getAllCharacters);
router.get("/:id", characterController.getCharacterById);

router.use(authController.protect, authController.restrictTo("admin"));

router.post("/", characterController.createCharacter);
router.patch("/:id", characterController.updateCharacter);
router.delete("/:id", characterController.deleteCharacter);

module.exports = router;
