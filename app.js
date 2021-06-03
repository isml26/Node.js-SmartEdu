const express = require("express");

const app = express();

//Template Engine
app.set('view engine','ejs');
//Middleware
app.use(express.static('public'));


const PORT = 3000;
//Routes
app.get('/', (req, res) => {
    res.status(200).render('index',{
        page_name:'index'
    });
});
app.get('/about', (req, res) => {
    res.status(200).render('about',{
        page_name:'about'
    });
});


app.listen(PORT, (req, res) => {
    console.log(`App started on ${PORT}`);
});