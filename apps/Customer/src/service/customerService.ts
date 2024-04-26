import Customer from '../model/customerModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import *as dotenv from 'dotenv';
import logger from '../utils/logger/index'
import { comparePassword, hashPassword } from '../utils/common';


dotenv.config();
const secret_key="lkjhgfdskjhgfkjhgf76543kjhgf"


  class customerService {
    public static async registerCustomer(customerData) {
    try {
        const { name, phonenumber, password, email, address} = customerData;
       
        const existingCustomer = await Customer.findOne<Customer>({ where: { email } });
        if (existingCustomer) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    
        const customer = await Customer.create({
            name,
            phonenumber,
            password :hashedPassword, 
            email,
            address,
           
        });

        return customer;
    } catch (error) {
        logger.error(`Failed to register user: ${error.message}`);
        throw new Error('Failed to register user');
    }
}




   
    
    public static async login(credentials) {
        try {
           
            const customer = await Customer.findOne({ where: { email: credentials.email } });
    
            if (!customer) {
            
                return { error: 'notExist' };
            }
    
           
            const validPassword = await bcrypt.compare(credentials.password, customer.password);
    
            if (!validPassword) {
            
                return { error: 'invalidPassword'};
            }
    
            // Generate token
          
            const token = jwt.sign({ id: customer.id }, secret_key, { expiresIn: '1h' });
            
    
            return { token, message: 'Login successful' };
        } catch (error) {
            console.error('Error during user login:', error);
        
            throw new Error('Error during user login: ' + error.message);
        }
    }
    
    

    
    


    public static async updateCustomer(id: string, customerData: { name: string, email: string}) {
        try {
            
            const customer= await Customer.findByPk(id);
      
          
            if (!customer) {
                throw new Error('user not found');
            }
      
            // Update user data
            customer.name = customerData.name;
            customer.email = customerData.email;
      
            // Save changes to the database
            await customer.save();
      
            return customer;
        } catch (error) {
            throw new Error('Failed to update user: ' + error.message);
        }
      }
      


      public static async deleteCustomer(customerId: string) {
        try {
           
            const deletedCustomer = await Customer.findByPk(customerId);
            if (!deletedCustomer) {
                throw new Error('Customer not found');
            }
           
            await deletedCustomer.destroy();
            return deletedCustomer; 
        } catch (error) {
            throw new Error(`Failed to delete customer: ${error.message}`);
        }
    }
    


public static async changePassword(data, customerId: string) {
    try {
      const { oldPassword, newPassword, confirmPassword } = data;
  
      if (newPassword !== confirmPassword) {
        return 'newPassword!=confirmPassword'; 
      }
      const existingCustomer = await Customer.findByPk(customerId);
      if (!existingCustomer) {
        return 'customerDoesNotExists';
      }
      console.log(existingCustomer);
      const isMatch = await comparePassword(oldPassword, existingCustomer.password);
      if (!isMatch) {
        return 'PasswordIncorrect'; 
      }
      const pass = await hashPassword(newPassword);
      existingCustomer.password = pass;
      await existingCustomer.update({ password: pass });
  
      return existingCustomer
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }  


public static async getCustomerById(id: string) {
    try {
        const customer = await Customer.findByPk(id);
        return customer;
    } catch (error) {
        throw new Error(`Failed to get customer by id: ${error.message}`);
    }
}



  }
export default customerService;
 