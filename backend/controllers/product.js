const { Product, Category } = require('../models');
const fs = require('fs');
const path = require('path');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['id', 'name'] }],
      order: [['createdAt', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    console.error('Get all products error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product by id error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, brand, categoryId, images = [] } = req.body;

    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: 'Category not found' });
    }

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      brand,
      images, // JSON format
      categoryId
    });

    res.status(201).json(product);
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (req.body.categoryId) {
      const category = await Category.findByPk(req.body.categoryId);
      if (!category) {
        return res.status(400).json({ message: 'Category not found' });
      }
    }

    const oldImages = product.images || [];
    const newImages = req.body.images || [];

    const removedImages = oldImages.filter(url => !newImages.includes(url));

    if (removedImages.length) {
      const uploadDir = path.join(__dirname, '../uploads/products');
      removedImages.forEach(imageUrl => {
        const filename = path.basename(imageUrl);
        const filePath = path.join(uploadDir, filename);
        fs.unlink(filePath, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error(`Error deleting file ${filename}:`, err);
          }
        });
      });
    }

    const { images, ...otherData } = req.body;
    await product.update({
      ...otherData,
      images: newImages,
      categoryId: req.body.categoryId || product.categoryId,
    });

    res.json(product);
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.images && product.images.length) {
      const uploadDir = path.join(__dirname, '../uploads/products');
      product.images.forEach(imageUrl => {
        const filename = path.basename(imageUrl);
        const filePath = path.join(uploadDir, filename);
        fs.unlink(filePath, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error(`Error deleting file ${filename}:`, err);
          }
        });
      });
    }

    await product.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};