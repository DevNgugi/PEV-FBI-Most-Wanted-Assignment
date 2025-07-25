const express = require('express');
const cors = require('cors');
const wantedRoutes = require('./routes/wanted.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/v1/wanted', wantedRoutes);

// Health Check
app.get('/api/v1/healthz', (req, res) => {
  //wip: to add more app health check logic
  res.status(200).json({ status: 'OK' });
});


app.use(errorHandler);

module.exports = app;
