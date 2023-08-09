const express = require("express");
const router = express.Router();
const viewController = require("../controllers/viewController");
const authController = require("../controllers/authController");

/*|------------------------------------------------------------------------------|
  |     MiddleWare Function in this route and their uses (Other than views)      |
  |     authController.isLoggedIn => Check if user is already logged in          |
  |                                                                              |
  |     authController.protect => Check if user is logged in before allowing     |
  |     access to private routes                                                 |
  |                                                                              |
  |     authController.restrictTo(role) => Allow access to the route only if user|
  |     has the authority                                                        |           
  |------------------------------------------------------------------------------|     
*/

router.get("/pdf-view",viewController.getAllCharacters); //ROOT URL - Render Home page

module.exports = router;