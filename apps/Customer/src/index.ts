export * from './lib/customer';
import *as express from 'express'; 
import *as bodyParser from 'body-parser';
import *as dotenv from 'dotenv';
import Routes from './routes/customerRoutes';
import helmet from "helmet";


dotenv.config();

const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use('/customer',Routes);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to management!' });
}); 

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
