const express = require("express");
const pool = require("./db")
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", function(req, res) {
    res.send('hello')
});

//responses with a list of representatives and the number of bills they proposed since a given date
app.get("/graph-apis/representative-bills", async function(req, res) {
    const date = req.query.startDate;
    const query = `
        SELECT MatterSponsorName, count(*) as numOfBills
        FROM mattersponsors 
        INNER JOIN matters
        ON mattersponsors.MatterSponsorMatterId = matters.MatterId
        ${date ? `WHERE matters.MatterIntroDate >= '${date}'` : ""}
        GROUP BY MatterSponsorName;`
    try {
        const representativeBillCount = await pool.query(query);
        res.json(representativeBillCount.rows)
    } catch (error) {
        console.error(error.message)
    }
});

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});