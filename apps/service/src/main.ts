import express from 'express'; 
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Routes from './routes/serviceRoutes';
import helmet from "helmet";
import cors from 'cors';


//configuring dotenv to load environment variables from a .env
dotenv.config();


//Setting Up Express App
const app = express();
app.use(express.json());

//Setting Up Middleware: Using helmet() to enhance the app's security by setting various HTTP headers and cors() to enable Cross-Origin Resource Sharing.
app.use(helmet());
app.use(cors());

// Parse JSON request bodies
app.use(bodyParser.json());


// API Routes: define routes for handling management.
app.use('/service',Routes);


//Basic route handler for the root URL ('/') which sends a simple message.
app.get('/', (req, res) => {
  res.send({ message: 'Welcome to management!' });
}); 


// Setting Port
const PORT = process.env.PORT || 5000;



//Basic route handler for the root URL ('/') which sends a simple message.
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



