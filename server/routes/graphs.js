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
    console.log("--------------------------------------------------------------------------------");
    console.log("Call to /proximity-calculation");
    let refs = req.query.refs;
    refs = refs[0].split(',');
    if (!refs || refs.length <= 1) {
        console.log("Refs too small (size " + refs.length + ")");
        res.status(400).send('Refs is missing!');
        return;
    }
    let targets = req.query.targets;
    targets = targets[0].split(',');
    if (!targets || targets.length <= 1) {
        console.log("Targets too small (size " + targets.length + ")");
        res.status(400).send('Targets is missing!');
        return;
    }
    console.log("Refs and targets exist");
    try {
        // Get votes data from database
        let allnames = refs.concat(targets);
        allnames[0] = allnames[0].replace(/_/gi," ");
        console.log(allnames);
        let v = await pool.query('SELECT * FROM votes WHERE votepersonname = $1', [allnames[0]]);
        console.log(v.rows[0]);
        let votes = v.rows;
        for (let i = 1; i < allnames.length; i++) {
          allnames[i] = allnames[i].replace(/_/gi," ");
          console.log(allnames[i]);
          const t = await pool.query('SELECT * FROM votes WHERE votepersonname = $1', [allnames[i]]);
          console.log(t.rows[0]);
          votes = votes.concat(t.rows);
        }

        // Create input file
        let ifname = "./proximity-calculation/calls/";
        for (let i = 0; i < refs.length; i++) {
          ifname += refs[i];
          if (i != refs.length - 1) { ifname += "_"; }
        }
        ifname += ".json";
        fs.writeFileSync(ifname, JSON.stringify(votes,null,4), 'utf8');

        // Run executable
        let command = "./proximity-calculation/prox ";
        command += ifname + " ";
    	  for (let i = 0; i < refs.length; i++) {
    		    command += refs[i];
    		    command += " ";
    	  }
    	  command += "targets ";
    	  for (let i = 0; i < targets.length; i++) {
    		    command += targets[i];
    		    command += " ";
    	  }
        console.log(command);
        exec(command, (err, stdout, stderr) => {
            if (err) {
    		        console.error(err.message)
            }
            else {
                // Await output file
            		let fname = "./proximity-calculation/responses/";
            		for (let i = 0; i < refs.length; i++) {
            			fname += refs[i];
            			if (i != refs.length - 1) { fname += "_"; }
            		}
            		fname += ".json";
        		    // Read and return output file
                try {
                  data = fs.readFileSync(fname, 'utf8');
                  res.json(JSON.parse(data));
                } catch (err) {
                  //console.log(err);
                }
            }
        });
    } catch (error) {
        console.error(error.message)
    }
});

module.exports = router;
