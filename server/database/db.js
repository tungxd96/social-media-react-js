const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'tungdinh',
    password: 'tungxd123',
    host: 'social-network.cknecashprpt.us-east-2.rds.amazonaws.com',
    port: 5432,
    database: 'socialmedia'
});

module.exports = pool;