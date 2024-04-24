import express from 'express'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Routes from './routes/adminRoutes';
import helmet from "helmet";

dotenv.config();

const app = express();
app.use(helmet());
// app.use(express.json()); 

app.use(bodyParser.json());

app.use('/admin',Routes);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to management!' });
}); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
