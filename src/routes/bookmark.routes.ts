import express from "express";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { AddBookmarkHandler, deleteBookmarkHandler, getAllBookmarkHandler } from "../controllers/bookmarked.controller";




const router = express.Router();
router.use(deserializeUser, requireUser);
// Get currently logged in user
router.patch('/addbookmark/:salonId',AddBookmarkHandler);
router.patch('/deletebookmark/:salonId',deleteBookmarkHandler)
router.get('/getAllBookmark',getAllBookmarkHandler);
//router.get('/email',findUserWithEmailHandler )
export default router;