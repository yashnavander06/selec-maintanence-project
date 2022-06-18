const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connection = require('./db.connect')
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
    res.send("Selec Server");
})

// Body-Parser initialization
app.use(bodyParser.json());

// Database Connection
connection();

// Import Routes
const Loginroute = require('./Routes/Login.routes')
app.use('/login', Loginroute);
const adminRoutes = require('./Routes/admin.routes')
app.use('/admin', adminRoutes);

// app connection
const PORT = process.env.PORT || 8080
app.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })

module.exports = { app }