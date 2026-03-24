const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Slider extends Model {}

Slider.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    img: {
      type: DataTypes.JSON, 
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'Slider',
  }
);

module.exports = Slider;