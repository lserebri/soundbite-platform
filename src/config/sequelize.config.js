import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.PG_LOCAL_DATABASE,
  process.env.PG_LOCAL_USER,
  process.env.PG_LOCAL_PASSWORD, {
    host: process.env.PG_LOCAL_HOST,
    dialect: 'postgres',
  }, {
    sync: {
      alter: true,
    }
  }
);

async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Database synced successfully');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
}

sequelize
 .authenticate()
 .then(() => {
    console.log("DATABASE CONNECTED");
 })
 .catch((err) => {
  console.log(err);
 });

export { sequelize, syncModels };