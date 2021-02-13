const express = require('express')
const app = express();
require('dotenv').config();
const authRoute = require('./routes/auth')
const session = require('express-session')
const passport = require('passport')
require('./strategies/discordstrategy')
const db = require('./database/database')

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))


const PORT = process.env.PORT || 3001;



app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000*60*24
    },
    saveUninitialized: false,
    resave: false,
    name: 'discord.ouauth2',
}))
app.use(passport.initialize())
app.use(passport.session());
app.use('/auth', authRoute)



app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})