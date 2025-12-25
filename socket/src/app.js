// app.js - express app and routes
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const roomRoutes = require('./routes/room.routes');
const { jsonResponse } = require('./utils/response');


const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


// health
app.get('/health', (req, res) => res.json({ ok: true, now: new Date().toISOString() }));


// routes
app.use('/api/rooms', roomRoutes);


// generic error handler
app.use((err, req, res, next) => {
console.error(err);
return res.status(500).json(jsonResponse(false, null, 'Internal Server Error'));
});


module.exports = app;