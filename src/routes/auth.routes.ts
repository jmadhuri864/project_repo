import express from 'express';
import {
  loginUserHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerUserHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema,  loginUserSchema} from '../schemas/user.schema';
import { userProfileCreateHandler } from '../controllers/userProfile.controller';
import { createProfileSchema } from '../schemas/userProfile.schema';

const router = express.Router();

// Register user
router.post('/signup', validate(createUserSchema), registerUserHandler);

router.post('/register',validate(createProfileSchema),userProfileCreateHandler)
// Login user
router.post('/login', validate(loginUserSchema), loginUserHandler);
// router.post(
//   '/forgotpassword',
//   validate(forgotPasswordSchema),
//   forgotPasswordHandler
// );

// router.patch(
//   '/resetpassword/:resetToken',
//   validate(resetPasswordSchema),
//   resetPasswordHandler
// );



// Logout user
router.get('/logout', deserializeUser, requireUser, logoutHandler);

// Refresh access token
router.get('/refresh', refreshAccessTokenHandler);

export default router;
