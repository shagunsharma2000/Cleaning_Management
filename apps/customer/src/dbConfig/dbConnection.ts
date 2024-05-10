import {Sequelize} from 'sequelize';
import  dotenv from 'dotenv';

dotenv.config();

 const sequelize = new Sequelize(

      
  process.env.DB_NAME || 'management',
   'root',
  process.env.DB_PASSWORD || 'Shagun@12345#',
  {
      host: process.env.DB_HOST || 'localhost',
      dialect: 'mysql',
      logging: console.log 
  }
  );
   
   sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully.');
   }).catch((error) => {
      console.error('Unable to connect to the database', error);
   });
   
   export default sequelize;  

   