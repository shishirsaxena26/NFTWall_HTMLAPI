// db.js - optional SQL Server placeholder (not required to run the in-memory version)
// If you later decide to enable SQL Server logging, configure and implement queries here.


// Example shows how you would export a connection pool using 'mssql' package.


/*
const sql = require('mssql');


const config = {
user: process.env.DB_USER,
password: process.env.DB_PASS,
server: process.env.DB_HOST,
database: process.env.DB_NAME,
options: { encrypt: false, trustServerCertificate: true },
pool: { max: 20, min: 0 }
};


const poolPromise = new sql.ConnectionPool(config)
.connect()
.then(pool => {
console.log('Connected to MSSQL');
return pool;
})
.catch(err => {
console.error('MSSQL Connection Error: ', err);
throw err;
});


module.exports = { sql, poolPromise };
*/


module.exports = null; // placeholder so imports won't fail