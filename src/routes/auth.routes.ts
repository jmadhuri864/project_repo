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
import { uploadPostImageDisk } from '../upload/single-upload-disk';
import { resizePostImage, uploadPostImage } from '../upload/single-upload-sharp';
import passport from 'passport';



const router = express.Router();
router.route('/register').post(uploadPostImage,
  resizePostImage,validate(createProfileSchema),userProfileCreateHandler)
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
router.get('/refresh/:refresh_token', refreshAccessTokenHandler);

router.get('/google', passport.authenticate('google'), (req, res) =>
  res.sendStatus(200)
);
router.get('/google/callback', passport.authenticate('google',{ failureRedirect: '/api/auth/google/error'}), 
(req, res) =>{

  res.redirect('/api/auth/google/success');

}
);
router.get('/google/success', async (req, res) => {
  // Handle successful authentication
 
  
  // const accessToken = req.session?.passport?.user?.accessToken;
  //   const refreshToken = req.session?.passport?.user?.refreshToken;
  res.sendStatus(200)
});

router.get('/google/error', (req, res) => res.send('Error logging in via Google..'));


router.get('/facebook', passport.authenticate('facebook'), (req, res) =>
  res.sendStatus(200)
);
router.get('/facebook/callback', passport.authenticate('facebook',{ failureRedirect: '/api/auth/facebook/error'}), 
(req, res) =>{
  res.send("Facebook authentication callback");
  res.redirect('/api/auth/facebook/success');

}
);
router.get('/facebook/success', async (req, res) => {
  // Handle successful authentication
 
  
  // const accessToken = req.session?.passport?.user?.accessToken;
  //   const refreshToken = req.session?.passport?.user?.refreshToken;
  res.sendStatus(200)
});

router.get('/facebook/error', (req, res) => res.send('Error logging in via facebook..'));


export default router;
