const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Newsletter extends Model {}

Newsletter.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'newsletter',
  }
);

module.exports = Newsletter;