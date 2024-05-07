import express from 'express'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Routes from './routes/customerRoutes';
import helmet from "helmet";
import cors from 'cors';

//configuring dotenv to load environment variables from a .env
dotenv.config();

//Setting Up Express App
const app = express();

//Setting Up Middleware: Using helmet() to enhance the app's security by setting various HTTP headers and cors() to enable Cross-Origin Resource Sharing.
app.use(helmet());
app.use(cors());


// Parse JSON request bodies
app.use(bodyParser.json());

// API Routes: define routes for handling customer.
app.use('/customer',Routes);


//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to management!' });
}); 


// Setting Port
const PORT = process.env.PORT || 4000;


//Starting the Server:The Express server to listen on the specified port.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
