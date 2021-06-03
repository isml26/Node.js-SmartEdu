const express = require("express");
const pageRoute = require('./routes/pageRoute')
const app = express();

//Template Engine
app.set('view engine','ejs');
//Middleware
app.use(express.static('public'));


const PORT = 3000;
//Routes
app.use('/', pageRoute);
app.use('/about', pageRoute);


app.listen(PORT, (req, res) => {
    console.log(`App started on ${PORT}`);
});