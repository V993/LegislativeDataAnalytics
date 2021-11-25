require('dotenv').config();
const cors = require('cors');
const express = require("express");
const pool = require("./db")
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

//returns a single object with council member info given their name
app.get("/info-apis/council-member-info", async function(req, res) {
    const name = req.query.name;
    try {
        const councilMemberInfo = await pool.query("SELECT * FROM councilmembers WHERE Name = $1", [name]);
        res.json(councilMemberInfo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//returns a single object with senate info given their name
app.get("/info-apis/senate-info", async function(req, res) {
    const name = req.query.name;
    try {
        const senateInfo = await pool.query("SELECT * FROM senate WHERE fullName = $1", [name]);
        res.json(senateInfo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//returns a single object with assembly member info given their name
app.get("/info-apis/assembly-info", async function(req, res) {
    const name = req.query.name;
    try {
        const assemblyInfo = await pool.query("SELECT * FROM assembly WHERE fullName = $1", [name]);
        res.json(assemblyInfo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
