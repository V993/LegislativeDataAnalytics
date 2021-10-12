const Pool = require("pg").Pool;

const pool = new Pool({
    user: "<USERNAME>",
    password: "<PASSWORD>",
    database: "<DATABASE>",
    host: "localhost",
    port: 5432
});

module.exports = pool;