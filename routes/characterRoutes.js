const router = require("express").Router();
const authController = require("../controllers/authController");
const characterController = require("../controllers/characterController");
router.use(authController.protect, authController.restrictTo("admin"));
router.get("/pdf-view", characterController.getCharacterPDF);
router
  .get("/", characterController.getAllCharacters)
  .post("/", characterController.createCharacter);

router
  .get("/:id", characterController.getCharacterById)
  .patch("/:id", characterController.updateCharacter)
  .delete("/:id", characterController.deleteCharacter);

module.exports = router;
