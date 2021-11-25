require('dotenv').config();
const cors = require('cors');
const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

console.log(pool);

app.use(express.json());
app.use(cors({
  origin: '*'
}));

app.get("/", function(req, res) {
    res.send('This is the port with the DB API')
});

//routes for graph apis
app.use("/graph-apis", require("./routes/graphs"));


app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
