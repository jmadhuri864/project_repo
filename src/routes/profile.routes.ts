import express from 'express';




import { getprofileHandler, updateProfileHandler } from '../controllers/userProfile.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { getProfileSchema, updateProfileSchema } from '../schemas/userProfile.schema';


const router = express.Router();

router.use(deserializeUser, requireUser);

router.get('/getProfile',getprofileHandler)
router
  .route('/:id')
  //.get(validate(getProfileSchema), getprofileHandler)
  .patch(validate(updateProfileSchema), updateProfileHandler)
//router.get('/email',findUserWithEmailHandler )
export default router;
