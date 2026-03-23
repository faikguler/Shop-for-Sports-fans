const { page } = require('../models');

const getAllpages = async (req, res) => {
  try {
    const pages = await page.findAll();
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getpageById = async (req, res) => {
  try {
    const page = await page.findByPk(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'page not found' });
    }
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createpage = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newpage = await page.create({ name, description });
    res.status(201).json(newpage);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'page name must be unique' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updatepage = async (req, res) => {
  try {
    const page = await page.findByPk(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'page not found' });
    }
    await page.update(req.body);
    res.status(200).json(page);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'page name must be unique' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deletepage = async (req, res) => {
  try {
    const page = await page.findByPk(req.params.id);
    if (!page) {
      return res.status(404).json({ message: 'page not found' });
    }
    await page.destroy();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllpages,
  getpageById,
  createpage,
  updatepage,
  deletepage,
};