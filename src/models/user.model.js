import { DataTypes } from 'sequelize';
import Soundbite from './soundbite.model.js';
import {sequelize} from '../config/sequelize.config.js'

const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  picture: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  externalId: {
    type: DataTypes.STRING,
    unique: true,
    required: true,
    // allowNull defaults to true
  },
}, {
  // Other model options go here
});

User.hasMany(Soundbite, { foreignKey: 'userId' });

export default User;
