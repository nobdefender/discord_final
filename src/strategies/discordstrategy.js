const DiscordUser = require('../modules/discordUser')
const passport = require('passport')
const OAuth2Strategy = require('passport-discord').Strategy;
require('dotenv').config();

passport.serializeUser((user, done) => {
    console.log('serializing user')
    console.log('from discordStrategy ' + user)
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    console.log('deserializing user')
    const user = await DiscordUser.findById(id)
    if (user){
        done(null, user)
    }

})

passport.use(new OAuth2Strategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CLIENT_REDIRECT,
        scope: ['email', 'guilds', 'identify'],
    },
    async (accessToken, refreshToken, profile, done) => {
         try {
             const user = await DiscordUser.findOne({discordId : profile.id})
             if(user){
                 console.log('user exist')
                 done(null, user)
             }
             else{
                 console.log('user does not exist')
                 const newUser = await DiscordUser.create({
                     discordId: profile.id,
                     username: profile.username,
                 })
                 const savedUser = await newUser.save()
                 done(null, savedUser)
             }
         }
         catch (err){
             console.log(err)
             done(err, null)
         }
    }
));