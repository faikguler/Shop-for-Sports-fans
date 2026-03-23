const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
app.get('/', (req, res) => {
  res.send('SportShop API working...');
});

sequelize.authenticate()
  .then(() => console.log('MySQL connected successfully.'))
  .catch(err => console.error('Unable to connect to MySQL:', err));

// Models
const User = require('./models/User'); // User Model

// Routes
const userRoutes = require('./routes/user'); // user.js 
app.use('/api/users', userRoutes);

const categoryRoutes = require('./routes/category'); //category.js
app.use('/api/categories', categoryRoutes);

const productRoutes = require('./routes/product'); // product.js
app.use('/api/products', productRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const newsletterRoutes = require('./routes/newsletterRoutes'); // newsletterRoutes.js
app.use('/api/newsletter', newsletterRoutes);


sequelize.sync()   // ({ alter: true }) 
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});