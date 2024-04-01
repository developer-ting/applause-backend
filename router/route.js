import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as controller from "../controllers/appController.js";
import * as authController from "../controllers/auth.js";
import * as filtersController from "../controllers/filters.js";
import * as talentsController from "../controllers/talents.js";
import * as usersController from "../controllers/users.js";

// AUTH
router.route("/register").post(authController.register); // register user
router.route("/login").post(controller.verifyUser, authController.login); // login user

// Filters - POST
router.route("/genre").post(filtersController.createGenre); // Genre
router.route("/language").post(filtersController.createLanguage); // Language
router.route("/platform").post(filtersController.createPlatform); // Platform
router.route("/skills").post(filtersController.createSkills); // Skills

// Filters - GET
router.route("/genre").get(filtersController.fetchGenre); // Genre
router.route("/language").get(filtersController.fetchLanguage); // Language
router.route("/platform").get(filtersController.fetchPlatform); // Platform
router.route("/skills").get(filtersController.fetchSkills); // Skills

// User - GET
router.route("/user").get(Auth, usersController.fetchOneUser); // Get User

// User - PUT
router.route("/user").put(Auth, usersController.updateOneUser); // Update User

// User - DELETE
router.route("/user").delete(Auth, usersController.deleteOneUser); // All User

// Talents - GET
router.route("/talents").get(talentsController.fetchAllTalents); // All Talents
router
  .route("/talentfilters")
  .get(talentsController.fetchAllTalentsOnlyNameAndId); // All Talents Only Names
router.route("/talents/:name").get(talentsController.fetchOneTalent); // One Talent

// Talents - POST
router.route("/talents").post(talentsController.createTalent); // All Talents

// Talents - DELETE
router.route("/talents/:name").delete(talentsController.deleteOneTalent); // Delete One Talent

// Talents - PUT
router.route("/talents/:name").put(talentsController.updateOneTalent); // Update One Talent

export default router;
