import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import sequelize from './dbConfig/dbConnection';
import router from './routes/equipementRoute';

sequelize;
//configuring dotenv t
dotenv.config();

//Setting Up Express App
const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());

app.use(bodyParser.json());

app.use('/v1/equipement', router);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to management!' });
});

// Setting Port
const PORT = process.env.PORT || 7000;

//Basic route handler for the root URL ('/') which sends a simple message.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
