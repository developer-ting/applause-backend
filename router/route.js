import { Router } from "express";
const router = Router();

//  import all controllers
import * as controller from "../controllers/appController.js";
import * as authController from "../controllers/auth.js";

// AUTH
router.route("/register").post(authController.register); // register user
router.route("/login").post(controller.verifyUser, authController.login); // login user

export default router;
