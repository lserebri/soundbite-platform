import { DataTypes } from 'sequelize';

import {sequelize} from '../config/sequelize.config.js'

const User = sequelize.define('users', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});

export default User;
