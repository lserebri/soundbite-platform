import { DataTypes } from 'sequelize';
import { sequelize } from '../config/sequelize.config.js';

const Soundbite = sequelize.define('soundbites', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add other soundbite properties as needed
});

export default Soundbite;