const express = require("express");
const router = express.Router();
const pool = require("../db")
const fs = require('fs');

//responds with a list of representatives and the number of bills they proposed since a given date
router.get("/graph-apis/representative-bills", async function(req, res) {
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

//responds with a list of committees and the number of bills they proposed since a given date
router.get("/graph-apis/committee-bills", async function(req, res) {
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

//responds with the list of representatives and the number of bills they proposed for each month in a given year
router.get("/graph-apis/activeness-by-month", async function(req, res) {
    const year = req.query.year;
    if (!year) {
        const err = new Error("Year is missing");
        err.status = 400;
        next(err);
    }
    const query = `
        SELECT MatterSponsorName, EXTRACT(MONTH FROM matters.MatterIntroDate) as month, COUNT(*) as numOfBills FROM mattersponsors
        INNER JOIN matters ON mattersponsors.MatterSponsorMatterId = matters.MatterId
        WHERE matters.MatterIntroDate >= '${year}-01-01' AND matters.MatterIntroDate <= '${year}-12-31'
        GROUP BY EXTRACT(MONTH FROM matters.MatterIntroDate), MatterSponsorName
        ORDER BY month;`
    try {
        const activenessByMonth = await pool.query(query);
        res.json(activenessByMonth.rows)
    } catch (error) {
        console.error(error.message)
    }
});

router.get("/graph-apis/proximity-calculation", async function(req, res) {
    const repx = req.query.repx.replace(' ','_');
    const repy = req.query.repy.replace(' ','_');
    try {
        fname = "./proximity-calculation/responses/" + repx + "_" + repy + ".json";
        data = fs.readFileSync('proximity-calculation/responses/' + repx + '_' + repy + '.json', 'utf8');
        console.log(data);
        res.json(JSON.parse(data));
    } catch (error) {
        console.error(error.message)
    }
});