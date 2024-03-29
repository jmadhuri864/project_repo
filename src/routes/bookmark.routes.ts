import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { AddBookmarkHandler } from "../controllers/bookmarked.controller";




const router = express.Router();
router.use(deserializeUser, requireUser);
// Get currently logged in user
router.post('/addbookmark',AddBookmarkHandler);
//router.get('/email',findUserWithEmailHandler )
export default router;