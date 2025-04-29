const { Pool } = require('pg');

exports.pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST, 
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT
});
