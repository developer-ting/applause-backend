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
import * as projectsController from "../controllers/projects.js";

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
router.route("/talents").get(talentsController.getTalents); // All Talents
router.route("/talentfilters").get(talentsController.getTalentsNameAndId); // All Talents Only Names
router.route("/talents/:name").get(talentsController.getTalent); // One Talent

// Talents - POST
router.route("/talents").post(talentsController.createTalent); // All Talents

// Talents - DELETE
router.route("/talents/:name").delete(talentsController.deleteOneTalent); // Delete One Talent

// Talents - PUT
router.route("/talents/:name").put(talentsController.updateOneTalent); // Update One Talent

// ===========================  Project Router ================================

// Projects - POST
router.route("/project").post(projectsController.createProjects); // Projects

// Projects - GET
router.route("/project").get(projectsController.fetchProjects); // Get project All

router.route("/project/:title").get(projectsController.fetchProject); // One project

router
  .route("/projectfilters")
  .get(projectsController.fetchAllProjectsOnlyNameAndId); // All project Only Names

// Project - PUT
router.route("/project/:title").put(projectsController.updateOneProject); // Update One project

// Project - DELETE
router.route("/project/:title").delete(projectsController.deleteOneProject); // Delete One project

// Genre - PUT
router.route("/genre/:title").put(filtersController.updateGenre); // Update One genre

// Genre - Delete
router.route("/genre/:title").delete(filtersController.deleteGenre); // Delete One genre

// language - PUT
router.route("/language/:title").put(filtersController.updateLanguage); // Update One language

// language - Delete
router.route("/language/:title").delete(filtersController.deleteLanguage); // Delete One language

// platform - PUT
router.route("/platform/:title").put(filtersController.updatePlatform); // Update One platform

// platform - Delete
router.route("/platform/:title").delete(filtersController.deletePlatform); // Delete One platform

// skills - PUT
router.route("/skills/:title").put(filtersController.updateSkills); // Update One skills

// skills - Delete
router.route("/skills/:title").delete(filtersController.deleteSkills); // Delete One skills

export default router;
