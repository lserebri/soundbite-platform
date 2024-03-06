import express from 'express';
import bodyParser from 'body-parser';
import soundBiteRouter from './routes/soundBite.route.js';
import rootRouter from './routes/root.route.js';
import { syncModels } from './config/sequelize.config.js';
import { auth } from 'express-openid-connect';
import { auth0Config } from './config/auth0.config.js';

const app = express();
const port = 3000;

syncModels();

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(auth0Config));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/', rootRouter);
app.use('/sound-bite', soundBiteRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

