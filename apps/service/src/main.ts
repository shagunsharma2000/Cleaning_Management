import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import router from './routes/serviceRoutes';

//configuring dotenv
dotenv.config();

//Setting Up Express App
const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());

// API Routes: define routes for handling management.
app.use('/v1/service', router);

//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to service!' });
});

// Setting Port
const PORT = process.env.PORT || 5000;

//Basic route handler for the root URL ('/') which sends a simple message.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
