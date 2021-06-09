const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require("method-override");
const dotenv = require("dotenv")
const pageRoute = require('./routes/pageRoute')
const courseRoute = require("./routes/courseRoute");
const categoryRoute = require("./routes/categoryRoute");
const userRoute = require("./routes/userRoute");

const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
dotenv.config();
//Template Engine
app.set('view engine', 'ejs');
//Global varibale
global.userIN = null;

//Middleware

app.use(express.static('public'));

app.use(session({
  secret: 'kunefe',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.URL
  })
}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flashMessages = req.flash();
  next();
});
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
})
const PORT = process.env.PORT || 3000 ;
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected Successfully");
});



//Routes
app.use('/', pageRoute);
app.use('/courses', courseRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);





app.listen(PORT, (req, res) => {
  console.log(`App started on ${PORT}`);
});