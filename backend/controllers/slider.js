const { Slider } = require('../models');
const fs = require('fs');
const path = require('path');

const getAllSliders = async (req, res) => {
  try {
    const sliders = await Slider.findAll();
    res.status(200).json(sliders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getSliderById = async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    res.status(200).json(slider);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createSlider = async (req, res) => {
  try {
    const { img } = req.body; 
    const newSlider = await Slider.create({ img });
    res.status(201).json(newSlider);
  } catch (error) {
    console.error('Create slider error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const updateSlider = async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }
    await slider.update(req.body);
    res.status(200).json(slider);
  } catch (error) {
    console.error('Update slider error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteSlider = async (req, res) => {
  try {
    const slider = await Slider.findByPk(req.params.id);
    if (!slider) {
      return res.status(404).json({ message: 'Slider not found' });
    }

    // Delete associated image files
    if (slider.img && Array.isArray(slider.img)) {
      const uploadDir = path.join(__dirname, '../uploads/slider');
      slider.img.forEach(imageUrl => {
        // Extract filename from the URL (e.g., /uploads/slider/slider-123.jpg)
        const filename = path.basename(imageUrl);
        const filePath = path.join(uploadDir, filename);
        fs.unlink(filePath, (err) => {
          if (err && err.code !== 'ENOENT') {
            console.error(`Error deleting file ${filename}:`, err.message);
          }
        });
      });
    } else {
      console.log('No images to delete or img field not an array');
    }

    await slider.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Delete slider error:', error);
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