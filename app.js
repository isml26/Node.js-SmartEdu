const express = require("express");

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.status(200).send("INDEX");
})


app.listen(PORT, (req, res) => {
    console.log(`App started on ${PORT}`);
});