const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const path = require('path');
const keys = require('./config/keys');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('client/build'));
app.use(
  cookieSession({
    keys: [keys.cookieSecret],
    maxAge: 30 * 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./passport/Passport');

app.use(userRoutes);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

mongoose.connect(
  `mongodb+srv://nisarg:${keys.mongoPassword}@cluster0.x2a77.mongodb.net/emailyDB`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(process.env.PORT || 5000, function () {
  console.log('Server is running on port 5000.');
});
