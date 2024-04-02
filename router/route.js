import { Router } from "express";
const router = Router();

//  import all controllers
import * as controller from "../controllers/appController.js";
import * as authController from "../controllers/auth.js";
import * as filtersController from "../controllers/filters.js";
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

// Projects - POST
router.route("/project").post(projectsController.createProjects); // Projects

// Projects - GET
router.route("/project").get(projectsController.fetchProjects); // Projects

export default router;
