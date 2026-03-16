const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('SportShop API working...');
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected successfully.'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

// Models
const User = require('./models/User'); // User Model

sequelize.sync({ alter: true }) 
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});