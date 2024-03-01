import express from 'express';
import bodyParser from 'body-parser';
import soundBiteRouter from './routes/soundBite.route'

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/sound-bite', soundBiteRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

