const express = require("express");
const router = express.Router();
const pool = require("../db")
const fs = require('fs');
const { exec } = require('child_process');

router.get("/", function(req, res) {
    res.send("This route is for the graph data");
});

//responds with a list of representatives and the number of bills they proposed since a given date
router.get("/representative-bills", async function(req, res) {
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
router.get("/committee-bills", async function(req, res) {
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
router.get("/activeness-by-month", async function(req, res) {
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

router.get("/proximity-calculation", async function(req, res) {
    console.log("called proximity-calculation");
    let refs = req.query.refs;
    refs = refs[0].split(',');
    let targets = req.query.targets;
    targets = targets[0].split(',');
    console.log(refs);
    console.log(targets);
    try {
        // Run executable
        let command = "./proximity-calculation/prox ";
    	  for (let i = 0; i < refs.length; i++) {
    		    command += refs[i];
    		    command += " ";
    	  }
    	  command += "targets ";
    	  for (let i = 0; i < targets.length; i++) {
    		    command += targets[i];
    		    command += " ";
    	  }
        exec(command, (err, stdout, stderr) => {
            if (err) {
    		        console.log("Error after cl call");
            }
            else {
    		        console.log("No error after cl call " + command);
                // Await output file
            		let fname = "./proximity-calculation/responses/";
            		for (let i = 0; i < refs.length; i++) {
            			fname += refs[i];
            			if (i != refs.length - 1) { fname += "_"; }
            		}
            		fname += ".json";
                data = fs.readFileSync(fname, 'utf8');
        		    // Read and return output file
                console.log(data);
              	res.json(JSON.parse(data));
            }
        });
    } catch (error) {
        console.error(error.message)
    }
});

module.exports = router;
