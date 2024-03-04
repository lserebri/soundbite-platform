import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PG_LOCAL_DATABASE,
  process.env.PG_LOCAL_USER,
  process.env.PG_LOCAL_PASSWORD, {
    host: process.env.PG_LOCAL_HOST,
    dialect: 'postgres',
  },
);
