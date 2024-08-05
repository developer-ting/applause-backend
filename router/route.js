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
import * as auditionController from "../controllers/audition.js";
import * as bookmarksController from "../controllers/bookmark.controller.js";

// ===========================  AUTH Routes ================================

router.route("/register").post(authController.register); // register user
router.route("/login").post(controller.verifyUser, authController.login); // login user

// ===========================  Filter Routes ================================

// Genre
// POST
router.route("/genre").post(filtersController.createGenre); // Create Genre
// PUT
router.route("/genre/:title").put(filtersController.updateGenre); // Update One genre
// GET
router.route("/genre").get(filtersController.fetchGenre); // Get All Genre
// Delete
router.route("/genre/:title").delete(filtersController.deleteGenre); // Delete One genre

// Language
// POST
router.route("/language").post(filtersController.createLanguage); // Create Language
// PUT
router.route("/language/:title").put(filtersController.updateLanguage); // Update One language
// GET
router.route("/language").get(filtersController.fetchLanguage); // Get All Language
// Delete
router.route("/language/:title").delete(filtersController.deleteLanguage); // Delete One language

// Platform
// POST
router.route("/platform").post(filtersController.createPlatform); // Create Platform
// PUT
router.route("/platform/:title").put(filtersController.updatePlatform); // Update One platform
// GET
router.route("/platform").get(filtersController.fetchPlatform); // Get All Platform
// Delete
router.route("/platform/:title").delete(filtersController.deletePlatform); // Delete One platform

// Skills
// POST
router.route("/skills").post(filtersController.createSkills); // Create Skill
// PUT
router.route("/skills/:title").put(filtersController.updateSkills); // Update One skills
// GET
router.route("/skills").get(filtersController.fetchSkills); // Get All Skills
// Delete
router.route("/skills/:title").delete(filtersController.deleteSkills); // Delete One skills

// ===========================  User Routes ================================
// GET
router.route("/user").get(Auth, usersController.fetchOneUser); // Get User
// PUT
router.route("/user").put(Auth, usersController.updateOneUser); // Update User
// DELETE
router.route("/user").delete(Auth, usersController.deleteOneUser); // All User

// ===========================  Talent Routes ================================
// GET
router.route("/talents").get(talentsController.getTalents); // All Talents
router.route("/talentfilters").get(talentsController.getTalentsNameAndId); // All Talents Only Names
router.route("/talents/:name").get(talentsController.getTalent); // One Talent
// POST
router.route("/talents").post(talentsController.createTalent); // All Talents
// DELETE
router.route("/talents/:name").delete(talentsController.deleteOneTalent); // Delete One Talent
// PUT
router.route("/talents/:name").put(talentsController.updateOneTalent); // Update One Talent

// ===========================  Project Routes ================================

// POST
router.route("/project").post(projectsController.createProjects); // Projects
router
  .route("/projectAudition")
  .post(projectsController.createProjectsAudition); // Projects Audition
// GET
router.route("/project").get(projectsController.getProjects); // Get project All
router.route("/projectAudition").get(projectsController.getProjectsAudition); // Get project All Audition
router.route("/projectfilters").get(projectsController.getProjectsNameAndId); // All project Only Names
router.route("/project/:title").get(projectsController.getProject); // One project
// POST
router.route("/project").post(projectsController.createProjects); // All Projects
// DELETE
router.route("/project/:title").delete(projectsController.deleteOneProject); // Delete One project
// PUT
router.route("/project/:title").put(projectsController.updateOneProject); // Update One project

// ===========================  Audition Routes ================================

//POST
router.route("/audition").post(auditionController.createAudition); // All audition
//GET
router.route("/audition").get(auditionController.getAudition); // All audition
// PUT
router.route("/audition/:characterName").put(auditionController.updateAudition); // Update audition
// DELETE
router
  .route("/audition/:characterName")
  .delete(auditionController.deleteAudition); // Delete One audition

// ===========================  Bookmark Routes ================================
// POST
router.route("/bookmarks").post(Auth, bookmarksController.createbookmark); // Get bookmarks

// GET
router.route("/bookmarks").get(bookmarksController.getBookmarks); // All Bookmarks
router.route("/bookmarks/:name").get(bookmarksController.getBookmark); // Get one bookmark

// PUT
router.route("/bookmarks/:name").put(bookmarksController.addToBookmark); // Add/Remove Item from Bookmark

// DELETE

export default router;
