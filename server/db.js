const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "postgres",
    host: process.env.DB_HOST,
    port: 5432
});

module.exports = pool;
