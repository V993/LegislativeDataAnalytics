const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "<PASSWORD>",
    database: "postgres",
    host: "<HOSTNAME>",
    port: 5432
});

module.exports = pool;