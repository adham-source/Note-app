import { Request, Response, Router } from 'express';
import passport, { Profile } from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../config/config';
import User from '../models/User';


const router = Router()
const { clientID, clientSecret, callbackURL } = config

passport.use(new GoogleStrategy({
    clientID,
    clientSecret,
    callbackURL
},
    async function (_accessToken: string, _refreshToken: string, profile: Profile, done) {
        const newUser = {
            googleId: profile.id as string,
            displayName: profile.displayName as string,
            firstName: profile.name!.givenName as string,
            lastName: profile.name!.familyName as string,
            //@ts-ignore
            profileImage: profile.photos[0].value as string
        }

        try {
            let user = await User.findOne({ googleId: profile.id }).exec()
            if (user) {
                done(null, user)
            } else {
                //@ts-ignore
                user = await User.create(newUser)
                done(null, user)
            }

        } catch (error) {
            console.error(error)
        }
    }
));

// Serialize and deserialize the user
passport.serializeUser((user, done) => {
    //@ts-ignore
    done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});



// Google login route
router.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login-failure',
        successRedirect: '/dashboard'
    })
)

router.get('/login-failure', (req: Request, res: Response) => {
    res.send('Something went wrong...')
})

router.get('/auth/logout', (req: Request, res: Response) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
            res.send('Error loged out')
            return
        }
        res.redirect('/')
    })
})



export default router