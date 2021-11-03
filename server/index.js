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

//responses with a list of representatives and the number of bills they proposed since a given date
app.get("/graph-apis/representative-bills", async function(req, res) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const query = `
        SELECT MatterSponsorName, count(*) as numOfBills
        FROM mattersponsors
        INNER JOIN matters
        ON mattersponsors.MatterSponsorMatterId = matters.MatterId
        ${startDate ? `WHERE matters.MatterIntroDate >= '${startDate}'` : ""}
        ${endDate ? `AND matters.MatterIntroDate <= '${endDate}'` : ""}
        GROUP BY MatterSponsorName;`
    try {
        const representativeBillCount = await pool.query(query);
        res.json(representativeBillCount.rows)
    } catch (error) {
        console.error(error.message)
    }
});

//responses with a list of committees and the number of bills they proposed since a given date
app.get("/graph-apis/committee-bills", async function(req, res) {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const query = `
        SELECT MatterBodyName, COUNT(*) as numOfBills
		FROM matters
        ${startDate ? `WHERE MatterIntroDate >= '${startDate}'` : ""}
        ${endDate ? `AND MatterIntroDate <= '${endDate}'` : ""}
        GROUP BY MatterBodyName;`
    try {
        const committeeBillCount = await pool.query(query);
        res.json(committeeBillCount.rows)
    } catch (error) {
        console.error(error.message)
    }
});


app.get("/graph-apis/proximity-calculation", async function(req, res) {
    try {
        const votes = await pool.query("SELECT VoteId, VotePersonName, VoteValueName, VoteEventItemId FROM votes")
        let data = JSON.stringify(votes.rows);
        fs.writeFileSync('result.json', data);
    } catch (error) {
        console.error(error.message)
    }
});


app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});
