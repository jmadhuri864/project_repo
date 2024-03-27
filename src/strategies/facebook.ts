import passport, { Profile } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../entities/user.entity';
import { UserProfile } from '../entities/userProfile.entity';

passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID!,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL!,
        profileFields: ['id', 'displayName', 'email', 'photos', 'birthday', 'gender'],
      },
      async (accessToken, refreshToken, profile: Profile, done) => {
        try {
          // Extract necessary information from the profile
          const id = profile.id;
          const displayName = profile.displayName || '';
          const photo = profile.photos ? profile.photos[0].value : '';
          const birthday = (profile as any)._json?.birthday || '';
          const gender = (profile as any)._json?.gender || '';
          const profilePicture = (profile as any)._json?.picture?.data?.url || '';
  
          // Check if user already exists by Facebook ID
          let user = await User.findOne({ where: { id } });
  
          if (!user) {
            // Create a new user if not exists
            user = await User.create({ id }).save();
  
            // Create user profile
            const userProfile = new UserProfile();
            userProfile.fullName = displayName;
            userProfile.dateOfBirth = birthday;
            userProfile.gender = gender;
            userProfile.image = profilePicture;
            //userProfile.user = user; // Associate the UserProfile with the created user
            await userProfile.save();
  
            console.log(user);
            console.log(userProfile);
          }
          return done(null, user);
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
