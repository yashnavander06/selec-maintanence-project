const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connection = require('./Config/db.connect')
const cors = require('cors')
require('dotenv').config({path: './Config/.env'});
const {init, agenda} = require('./Config/agendaconfig');
var apiLogs = require('api-logs');
// const express = require('express');
const pino = require('pino');
const expressPino = require('express-pino-logger');
// const transport = require('./mongo-transport')
// const logger = require('./Config/logger')

// init();
var Agendash = require("agendash");
// initialize express
const app = express();

// Body-Parser initialization
app.use(bodyParser.json());

// Database Connection
connection();

// Setting up CORS config
app.use(cors())

// Agenda Dashboard
app.use("/dash", Agendash(agenda));

// Import Routes
const Loginroute = require('./Routes/Login.routes') // Login routes
app.use('/login', Loginroute);
const adminRoutes = require('./Routes/admin.routes') // Admin routes
app.use('/admin', adminRoutes);
const requesteeRoutes = require('./Routes/requestee.routes') // Requestee routes
app.use('/requestee', requesteeRoutes)
const techinternalroutes = require('./Routes/technician.routes'); // Technician routes
app.use('/technician',techinternalroutes)
const DummyRoute = require('./Routes/test.routes'); // Dummy routes
const { info } = require('winston');
app.use('/test', DummyRoute)



// default and incorrect route
app.get('/', (req, res) => {
    res.send("Selec Server");
})

const logger = pino({level: process.env.LOG_LEVEL || 'trace' }, pino.destination(`./Controllers/logger.log`));
const expressLogger = expressPino({ logger });

// const PORT = process.env.PORT || 3000;

app.use(expressLogger);


// app.listen(PORT, () => {
//  logger.info('Server running on port %d', PORT);
// });


// logs


// app connection

const PORT = process.env.PORT || 8080
app.listen(PORT, () => { 
    logger.info(`Cors-enable Server running on http://localhost:${PORT}`)     
    console.log(`Cors-enable Server running on http://localhost:${PORT}`)
})    
      