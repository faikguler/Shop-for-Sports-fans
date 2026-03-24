const sequelize = require('../backend/config/database');
const bcrypt = require('bcrypt');
const { Category, Product, User, Page } = require('../backend/models'); // Import Page

// Load seed data
const categoriesData = require('./categories.json');
const productsData = require('./products.json');
const usersData = require('./users.json');
const pagesData = require('./pages.json');

const seedDatabase = async () => {
  try {
    // Force sync to start clean (optional – use with caution)
    await sequelize.sync({ force: true });
    console.log('Database synced (force: true).');

    // Insert categories
    await Category.bulkCreate(categoriesData);
    console.log('Categories seeded.');

    // Insert products
    await Product.bulkCreate(productsData);
    console.log('Products seeded.');

    // Insert users with hashed passwords
    for (const user of usersData) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
        role: user.role,
      });
    }
    console.log('Users seeded.');

    // Insert pages
    await Page.bulkCreate(pagesData);
    console.log('Pages seeded.');

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();