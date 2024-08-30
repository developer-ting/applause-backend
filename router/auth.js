import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as controller from "../controllers/appController.js";
import * as authController from "../controllers/auth.js";

// ===========================  AUTH Routes ================================

router.route("/register").post(authController.register); // register user
router.route("/login").post(controller.verifyUser, authController.login); // login user

export default router;
