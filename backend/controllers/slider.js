const { Slider } = require('../models');

const getAllSliders = async (req, res) => {
  try {
    const Sliders = await Slider.findAll();
    res.status(200).json(Sliders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSliderById = async (req, res) => {
  try {
    const Slider = await Slider.findByPk(req.params.id);
    if (!Slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.status(200).json(Slider);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createSlider = async (req, res) => {
  try {
    const { name, description, location } = req.body;
    const newSlider = await Slider.create({ img });
    res.status(201).json(newSlider);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Slider name must be unique' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    const Slider = await Slider.findByPk(req.params.id);
    if (!Slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    await Slider.update(req.body);
    res.status(200).json(Slider);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'Slider name must be unique' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


const deleteSlider = async (req, res) => {
  try {
    const Slider = await Slider.findByPk(req.params.id);
    if (!Slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    await Slider.destroy();
    res.status(204).send(); 
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getAllSliders,
  getSliderById,
  createSlider,
  updateSlider,
  deleteSlider,
};