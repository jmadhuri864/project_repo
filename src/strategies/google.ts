import passport from 'passport';
import { Profile, Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/userProfile.entity';
import { createUser } from '../services/user.service';
import { createProfile } from '../services/userProfile.service';
import { AppDataSource } from '../utils/data-source';
// Assuming you have a service to handle profile creation

// // Serialize and deserialize user for session management
// passport.serializeUser((user:User, done) => {
//     try {
//         // Ensure user object has an 'id' property
//         if (!user||!user.id) {
//             throw new Error('User object does not have an id property');
//         }
//         console.log("This is google serialoze id ",user.id)
//         // Serialize user with user id
//         done(null, user.id);
//     } catch (error) {
//         // Handle serialization error
//         console.error('Failed to serialize user:', error);
//         done(error);
//     }
// });

// passport.deserializeUser(async (email: string, done) => {
//     const userRepository = AppDataSource.getRepository(User);
//     try {
//         const user = await userRepository.findOne(id);
//         done(null, user);
//     } catch (error) {
//         done(error);
//     }
// });

passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (email:string, done) => {
   // const userRepository = getRepository(User);
   const userRepository = AppDataSource.getRepository(User);
    try {
      const user = await userRepository.findOne({ where: { email } });
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: process.env.GOOGLE_REDIRECT_URL,
            //scope: ['email'],
        },
        // async (
        //     accessToken: string,
        //     refreshToken: string,
        //     profile: Profile,
        //     done: VerifyCallback
        // ) => {
            async (accessToken, refreshToken, profile, done) => {
                const userRepository = AppDataSource.getRepository(User);
            try {
                // console.log("google api")
                // console.log(refreshToken)
                
                // let user1 = await userRepository.findOne({ googleId: profile.id });
                // // Extract email from the profile
                // const email = profile.emails?.[0]?.value;
    
                // if (!email) {
                //     return done(new Error('No email found in Google profile'));
                // }
    
                // // Check if the user exists in your database
                // let user = await User.findOneBy({email});
    
                // // If the user doesn't exist, create a new user
                // if (!user) {
                //     // Create a new user
                //     user = await createUser({ email});
                // }
    
                // // Check if the user already has a profile
                // if (!user.profile) {
                //     // Create user profile
                //     const userProfile = await createProfile({
                //         fullName: profile.displayName || '',
                //         email: email,
                //         nickname:profile.name?.givenName||'',
                //         // You can extract more information from the profile here and add to the profile entity
                //     }, user);
                //     console.log(userProfile);
                //     console.log(user);
                // }
    
                // // Call done to indicate successful authentication and pass the user object
                // done(null,user);
                let user1 = await userRepository.findOne({ where:{googleId: profile.id} });
                const email = profile.emails?.[0]?.value;
                if (!email) {
                        return done(new Error('No email found in Google profile'));
                    }
        
                    // Check if the user exists in your database
                    let user = await User.findOneBy({email});
        

        if (!user) {
          user = await userRepository.save({
            googleId: profile.id,
            email: profile.emails ? profile.emails[0].value : '',
            //displayName: profile.displayName
          });
        }
        

        done(null, user);
            } catch (error:any) {
                // If an error occurs during the authentication process, call done with the error
                console.error('Error during Google OAuth authentication:', error);
                done(error);
            }
        }
    )
);

