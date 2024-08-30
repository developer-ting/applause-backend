import { Router } from "express";
const router = Router();

// middlewares
import Auth from "../middlewares/auth.js";

//  import all controllers
import * as talentsController from "../controllers/talents.js";

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

export default router;
