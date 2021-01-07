const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const keys = require('./config/keys');

require('./models/User');
require('./models/Post');
require('./models/Invite');
require('./models/Picture');
require('./models/Connection');
require('./services/passport');
require('./services/picture-upload-s3');

/**
 * This file sets up the server and connects all the needed files to it like:
 *  Routes, DB models, services (passport).
 *  Order of require statements matters as the model statements are needed
 *  for the passport services.
 * */

mongoose.connect(keys.mongoURI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true,
});

const app = express();
app.use(express.json());

app.use(flash());
app.use(
   session({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secret: ['mango'],
      resave: false,
      saveUninitialized: false,
   })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/postRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/inviteRoutes')(app);
require('./routes/pictureRoutes')(app);
require('./routes/connectionRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
