const express = require("express");
const router = express.Router();
const pool = require("../db")

//returns a single object with council member info given their name
router.get("/info-apis/council-member-info", async function(req, res) {
    const name = req.query.name;
    try {
        const councilMemberInfo = await pool.query("SELECT * FROM councilmembers WHERE Name = $1", [name]);
        res.json(councilMemberInfo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//returns a single object with senate info given their name
router.get("/info-apis/senate-info", async function(req, res) {
    const name = req.query.name;
    try {
        const senateInfo = await pool.query("SELECT * FROM senate WHERE fullName = $1", [name]);
        res.json(senateInfo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

//returns a single object with assembly member info given their name
router.get("/info-apis/assembly-info", async function(req, res) {
    const name = req.query.name;
    try {
        const assemblyInfo = await pool.query("SELECT * FROM assembly WHERE fullName = $1", [name]);
        res.json(assemblyInfo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
});

module.exports = router;