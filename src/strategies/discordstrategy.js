
const passport = require('passport')
const OAuth2Strategy = require('passport-discord').Strategy;


passport.use(new OAuth2Strategy({
        clientID: '801168654510719016',
        clientSecret: 'LCsugrDDJGHjVTxmqzV6QXt6i5vJHeCz',
        callbackURL: 'http://localhost:3000/auth/redirect',
        scope: ['email', 'guilds', 'identify'],
    },
    (accessToken, refreshToken, profile, done) => {
         console.log(profile.username)
    }
));