import express from 'express';




import { getprofileHandler } from '../controllers/userProfile.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';


const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/getProfile',getprofileHandler)
//router.get('/email',findUserWithEmailHandler )
export default router;
