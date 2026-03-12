const fs = require('fs');
const sql = require('mssql');
const sql2 = require('mssql');
const express = require('express');
const app = express();
const https = require('https');
const cors = require('cors');

app.use(cors({
  origin: ['https://nftwall.io', 'http://localhost:5173', 'http://localhost:8010',  'http://ezetrade.ai', 'https://eze.stbots.io'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

const sslOptions = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
};

const config = {
        user: 'rptuser',
        password: '*8WK*G?*uBweN$5_=U$MY',
        server: 'EC2AMAZ-J2PGR5M',
        database: 'reportdb',
        synchronize: true,
        trustServerCertificate: true,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            trustedConnection: true,
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        }
}

const Dconfig = {
        user: 'dUser',
        password: 'D@User!786',
        server: 'EC2AMAZ-J2PGR5M',
        database: 'DAccount',
        synchronize: true,
        trustServerCertificate: true,
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        },
        options: {
            trustedConnection: true,
            encrypt: true,
            enableArithAbort: true,
            trustServerCertificate: true,
        }
}

let pool; // will hold our connection pool
let poolDAccount; // will hold our connection pool

async function getPool() {
  try {
    if (!pool || !pool.connected) {
      console.log('🔄 (Re)connecting SQL pool...');
      pool = await new sql.ConnectionPool(config).connect();
      console.log('✅ SQL Connected');
    }
    return pool;
  } catch (err) {
    console.error('❌ SQL connect failed:', err.message);
    // wait a bit before retrying
    await new Promise((r) => setTimeout(r, 2000));
    return getPool(); // recursive retry
  }
}

async function getPoolDAccount() {
  try {
    if (!poolDAccount || !poolDAccount.connected) {
      console.log('🔄 (Re)connecting sql2 pool...');
      poolDAccount = await new sql2.ConnectionPool(Dconfig).connect();
      console.log('✅ sql2 Connected');
    }
	return poolDAccount;
  } catch (err) {
    console.error('❌ sql2 connect failed:', err.message);
    // wait a bit before retrying
    await new Promise((r) => setTimeout(r, 2000));
    return getPoolDAccount(); // recursive retry
  }
}


async function callProcedureDAccount(procedureName, params = {}) {
    try {
		console.log("callProcedureDAccount");
     // const pool = await sql.connect(config);
      // ✅ get the shared pool (auto-reconnect if broken)
      const poolDAccount = await getPoolDAccount();
      
      // ✅ create a request from the pool
      const request = poolDAccount.request();
  
      // Add input parameters dynamically
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
      }
  
      const result = await request.execute('sp_'+procedureName);
      return result.recordsets; // Return only recordset or full result //result.recordset || result; 
    } catch (err) {
      console.error('SQL error:', err);
      throw err;
    }
  }
// Example Express.js API endpoint

async function callProcedure(procedureName, params = {}) {
    try {
		console.log("callProcedure");
     // const pool = await sql.connect(config);
      // ✅ get the shared pool (auto-reconnect if broken)
      const pool = await getPool();
      
      // ✅ create a request from the pool
      const request = pool.request();
  
      // Add input parameters dynamically
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value);
      }
  
      const result = await request.execute('sp_'+procedureName);
      return result.recordsets; // Return only recordset or full result //result.recordset || result; 
    } catch (err) {
      console.error('SQL error:', err);
      throw err;
    }
  }
// Example Express.js API endpoint


app.get('/api/dacct-proc', async (req, res) => {
    const procedureName = req.query.procedureName;
    
    // Remove procedureName from the query params
    const { procedureName: _, ...params } = req.query;
  
    if (!procedureName) {
      return res.status(400).json({ success: false, error: 'procedureName is required' });
    }


    try {
        
		const result = await callProcedureDAccount(procedureName, params);
        res.json({ success: true, data: result });
		
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }

});

app.get('/api/call-proc', async (req, res) => {
    const procedureName = req.query.procedureName;
    
    // Remove procedureName from the query params
    const { procedureName: _, ...params } = req.query;
  
    if (!procedureName) {
      return res.status(400).json({ success: false, error: 'procedureName is required' });
    }


    try {
        
		const result = await callProcedure(procedureName, params);
        res.json({ success: true, data: result });
		
      } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }

});
var port = process.env.PORT || 2096;


https.createServer(sslOptions, app).listen(2096, () => {
  console.log('✅ HTTPS server running at https://localhost:8443');
});



//npm install -g pm2
//pm2 start server.js --name nodeapi

//pm2 logs nodeapi    # see logs

//pm2 start server.js --name nodeapi -i 3
//pm2 restart server.js --name nodeapi -i 3

//pm2 list
//pm2 monit

//pm2 stop all
//pm2 delete all