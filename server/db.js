const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "",
    database: "postgres",
    host: "",
    port: 5432
});

module.exports = pool;