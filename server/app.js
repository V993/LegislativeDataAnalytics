const express = require("express");

const app = express();

const PORT = process.env.PORT || 5000;


app.get("/", function(req, res) {
    res.send('hello')
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});