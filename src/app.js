const express = require('express')
const app = express();
const PORT = 3000;
const authRoute = require('./routes/auth')
const session = require('express-session')
const passport = require('passport')
require('./strategies/discordstrategy')



app.use(session({
    secret: 'some random secret',
    cookie: {
        maxAge: 60000*60*24
    },
    saveUninitialized: false,
    resave: false,
}))

app.use('/auth', authRoute)

app.use(passport.initialize())
app.use(passport.session());

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})