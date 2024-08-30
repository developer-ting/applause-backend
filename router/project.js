import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as projectsController from "../controllers/projects.js";

// POST
router.route("/project").post(projectsController.createProjects); // Projects
router
  .route("/projectAudition")
  .post(projectsController.createProjectsAudition); // Projects Audition
// GET
router.route("/project").get(projectsController.getProjects); // Get project All
// router.route("/projectAudition").get(projectsController.getProjectsAudition); // Get project All Audition
router.route("/projectfilters").get(projectsController.getProjectsNameAndId); // All project Only Names
router.route("/project/:title").get(projectsController.getProject); // One project
// POST
router.route("/project").post(projectsController.createProjects); // All Projects
// DELETE
router.route("/project/:title").delete(projectsController.deleteOneProject); // Delete One project
// PUT
router.route("/project/:title").put(projectsController.updateOneProject); // Update One project

export default router;
