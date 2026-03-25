const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const path = require('path');
const bcrypt = require('bcrypt');

dotenv.config();


console.log('DB_DIALECT:', process.env.DB_DIALECT);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Test route
//app.get('/', (req, res) => {
//  res.send('SportShop API working...');
//});

// Routes
const userRoutes = require('./routes/user'); // user.js 
app.use('/api/users', userRoutes);

const categoryRoutes = require('./routes/category'); //category.js
app.use('/api/categories', categoryRoutes);

const pageRoutes = require('./routes/page'); //page.js
app.use('/api/pages', pageRoutes);

const productRoutes = require('./routes/product'); // product.js
app.use('/api/products', productRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/api/upload', uploadRoutes);

const newsletterRoutes = require('./routes/newsletterRoutes'); // newsletterRoutes.js
app.use('/api/newsletter', newsletterRoutes);

const orderRoutes = require('./routes/order');
app.use('/api/orders', orderRoutes);

const sliderRoutes = require('./routes/slider');
app.use('/api/sliders', sliderRoutes);

const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

const reviewRoutes = require('./routes/review');
app.use('/api/reviews', reviewRoutes);

const frontendPath = path.join(__dirname, '../dist');
console.log('Serving static from:', frontendPath); 
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

sequelize.sync({ alter: true })
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Sync error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});