import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
// import Routes from './';
import helmet from 'helmet';
import cors from 'cors';

//configuring dotenv
dotenv.config();

//Setting Up Express App
const app = express();

app.use(helmet());
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// API Routes: define routes for handling customer.
// app.use('/customer', Routes);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to management!' });
});

// Setting Port
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`[server]: Store is running at port: ${PORT}`);
});
