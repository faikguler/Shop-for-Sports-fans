const sequelize = require("../config/database");

//importing Models
const {Category} = require("../models");

//Importing seeding
const categoriesData = require("./categories.json");

// Seed database
const seedDatabase = async () => {
    try {
        await sequelize.sync({ force: true });
        await Category.bulkCreate(categoriesData);
        process.exit(0);
    }   catch (err) {
        console.error('Seeding failed:', err);
        process.exit(1);
    }


  
};

seedDatabase();