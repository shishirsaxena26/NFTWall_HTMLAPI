const sql = require('mssql');
const express = require('express');
const app = express();
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 120 }); // 1 minute cache
let { bech32, bech32m } = require('bech32');


const config = {
        user: 'rptuser',
        password: '*8WK*G?*uBweN$5_=U$MY',
        server: '52.220.77.185',
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

let pool; // will hold our connection pool

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

async function callProcedure(procedureName, params = {}) {
    try {
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
      return result.recordset || result; // Return only recordset or full result
    } catch (err) {
      console.error('SQL error:', err);
      throw err;
    }
  }
// Example Express.js API endpoint


app.get('/api/call-proc', async (req, res) => {
    const procedureName = req.query.procedureName;
    
    // Remove procedureName from the query params
    const { procedureName: _, ...params } = req.query;

    if (params.address) {
      let cacheKey = `${params.address}`;
      const cached = cache.get(cacheKey);
      if (cached) return res.json(cached);
    }
    
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

app.listen(8090, () => {
  console.log('Server running on http://localhost:3000');
  
// example validator operator bech32
const valoperAddr = "ethm1lm4nqcac7uk0hnmfhtsy2y0agutaw0appul49t";

console.log("valoperAddr:", valoperAddr);
// decode bech32
const { words } = bech32.decode(valoperAddr);
const bytes = bech32.fromWords(words);

// convert to hex (0x...)
const hex = "0x" + Buffer.from(bytes).toString("hex");

console.log("Hex address:", hex);



const mymetamaskvalidator="0xFEeB3063B8f72CfBCF69Bae04511fD4717D73fA1";
// Remove 0x and convert to bytes
const bytes1 = Buffer.from(mymetamaskvalidator.replace(/^0x/, ""), "hex");

// Encode to Bech32 with validator prefix
const valoperAddrnew = bech32.encode("ethmvaloper", bech32.toWords(bytes1));

console.log("Ether Validator Operator Address:", valoperAddrnew);

});


//npm install -g pm2
//pm2 start server.js --name nodeapi

//pm2 logs nodeapi    # see logs

//pm2 start server.js --name nodeapi
//pm2 restart server.js --name nodeapi -i 3

//pm2 list
//pm2 monit

//pm2 stop all
//pm2 delete all

