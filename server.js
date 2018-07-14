const express = require('express');
const mongoose = require('mongoose');
const dbRoutes = require('./routes/databaseAccess.js');
const bodyParser = require('body-parser');
const session = require('express-session')
// const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const auth = require('./routes/auth.js');
const MongoStore = require('connect-mongo')(session);
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));

// connect to mongoDB
if (!process.env.MONGODB_URI) {
  console.log('MONGODB_URI config failed');
  process.exit(1);
}
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on('error', console.error);

// initialize http server
const app = express();
//const router = Router();

// MIDDLEWARE
app.use(express.static('build'));
app.use('/db', dbRoutes);
app.use(bodyParser.json());
app.use(logger('dev'));

// Session info here
app.use(session({
  secret: process.env.SECRET,
  name: 'Abbyscookie',
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});
// Passport Deserialize
passport.deserializeUser(function(id, done) {
  models.User.findById(id, function(err, user) {
    done(err, user);
  });
});
// Passport Strategy
passport.use(new LocalStrategy(function(username, password, done) {
  models.Users.findOne({ username: username}, function(err, user) {
    if (err) {
      console.error(err);
      return done(err);
    }
    if (!user) {
      console.log(user);
      return done(null, false, { message: 'Incorrect username. '});
    }
    //if passwords don't match, authorization failed
    if (user.password !== password) {
      return done(null, false, { message: 'Incorrect password. '});
    }
    //if authorization succeeds
    return done(null, user)
  });
}));
app.use(passport.initialize());
// Initialize Passport
app.use(passport.session());
// Passport Serialize

app.use('/', auth(passport));

// handle / route
app.get('/', (req, res) =>
  res.send('Hello world.') // WHAT GOES HERE ??
)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// launch server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http://${port}`);
})
