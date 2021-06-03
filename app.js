const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const pageRoute = require('./routes/pageRoute')
const courseRoute = require("./routes/courseRoute");
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({
  extended: true
})) // for parsing application/x-www-form-urlencoded
dotenv.config();
//Template Engine
app.set('view engine', 'ejs');
//Middleware
app.use(express.static('public'));


const PORT = 3000;

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
app.use('/about', pageRoute);


app.listen(PORT, (req, res) => {
  console.log(`App started on ${PORT}`);
});