import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as usersController from "../controllers/users.js";

// GET
router.route("/user").get(Auth, usersController.fetchOneUser); // Get User
// GET
router.route("/users").get(Auth, usersController.fetchAllUser); // Get User
// PUT
router.route("/user").put(Auth, usersController.updateOneUser); // Update User
// DELETE
router.route("/user").delete(Auth, usersController.deleteOneUser); // All User

export default router;
