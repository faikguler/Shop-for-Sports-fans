const sequelize = require('../backend/config/database');
const bcrypt = require('bcrypt');
const { Category, Product, User, Page, Slider, Order, OrderItem, Newsletter, ContactMessage } = require('../backend/models');

// Load seed data
const categoriesData = require('./categories.json');
const productsData = require('./products.json');
const usersData = require('./users.json');
const pagesData = require('./pages.json');
const slidersData = require('./sliders.json');
const ordersData = require('./orders.json');
const newslettersData = require('./newsletters.json');
const contactData = require('./contact.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synced (force: true).');

    await Category.bulkCreate(categoriesData);
    console.log('Categories seeded.');

    const createdProducts = await Product.bulkCreate(productsData, { returning: true });
    console.log('Products seeded.');

    const createdUsers = [];
    for (const user of usersData) {
      const newUser = await User.create({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      createdUsers.push(newUser);
    }
    console.log('Users seeded.');

    await Page.bulkCreate(pagesData);
    console.log('Pages seeded.');

    await Slider.bulkCreate(slidersData);
    console.log('Sliders seeded.');
    
    await Newsletter.bulkCreate(newslettersData, { ignoreDuplicates: true });
    console.log('Newsletters seeded.');

    await ContactMessage.bulkCreate(contactData);
    console.log('Contact messages seeded.');

    const productMap = {};
    createdProducts.forEach(p => { productMap[p.name] = p.id; });

    for (const orderData of ordersData) {
      const user = await User.findOne({ where: { email: orderData.userEmail } });
      if (!user) {
        console.warn(`User ${orderData.userEmail} not found, skipping order`);
        continue;
      }

      let totalAmount = 0;
      const orderItemsData = [];
      for (const item of orderData.items) {
        const product = createdProducts.find(p => p.name === item.productName);
        if (!product) {
          console.warn(`Product ${item.productName} not found, skipping item`);
          continue;
        }
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;
        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // Create the order
      const order = await Order.create({
        userId: user.id,
        totalAmount,
        status: orderData.status,
        shippingAddress: orderData.shippingAddress,
        paymentMethod: orderData.paymentMethod,
      });

      // Create order items
      for (const itemData of orderItemsData) {
        await OrderItem.create({
          orderId: order.id,
          productId: itemData.productId,
          quantity: itemData.quantity,
          price: itemData.price,
        });
      }
    }
    console.log('Orders seeded.');

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedDatabase();