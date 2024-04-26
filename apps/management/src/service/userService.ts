import User from '../model/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../utils/logger/index'
import { comparePassword, hashPassword } from '../utils/common';
import middleWare from '../utils/middleWare/auth'

dotenv.config();
const secret_key="lkjhgfdskjhgfkjhgf76543kjhgf"


  class userService {
    public static async registerUser(userData) {
    try {
        const { name, phonenumber, password, available, email, address, Role } = userData;
        // Check if email already exists
        const existingUser = await User.findOne<User>({ where: { email } });
        if (existingUser) {
            throw new Error('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

    
        const user = await User.create({
            name,
            phonenumber,
            available,
            password :hashedPassword, 
            email,
            address,
            Role
        });

        return user;
    } catch (error) {
        logger.error(`Failed to register user: ${error.message}`);
        throw new Error('Failed to register user');
    }
}




   
    
    public static async login(credentials) {
        try {
           
            const user = await User.findOne({ where: { email: credentials.email } });
    
            if (!user) {
            
                return { error: 'notExist' };
            }
    
            // Compare password hashes
            const validPassword = await bcrypt.compare(credentials.password, user.password);
    
            if (!validPassword) {
                // If password is invalid, return an error
                return { error: 'invalidPassword'};
            }
    
            // Generate token
          
            const token = jwt.sign({ id: user.id }, secret_key, { expiresIn: '1h' });
            
    
            return { token, message: 'Login successful' };
        } catch (error) {
            console.error('Error during user login:', error);
        
            throw new Error('Error during user login: ' + error.message);
        }
    }
    
    

    
    


    public static async updateUser(id: string, userData: { name: string, email: string}) {
        try {
            
            const user= await User.findByPk(id);
      
          
            if (!user) {
                throw new Error('user not found');
            }
      
            // Update user data
            user.name = userData.name;
            user.email = userData.email;
      
            // Save changes to the database
            await user.save();
      
            return user;
        } catch (error) {
            throw new Error('Failed to update user: ' + error.message);
        }
      }
      


      public static async deleteUser(userId: string) {
        try {
            // Find the user by their user ID
            const deletedUser = await User.findByPk(userId);
            if (!deletedUser) {
                throw new Error('User not found');
            }
            // Delete the user
            await deletedUser.destroy();
            return deletedUser; 
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    }
    


public static async changePassword(data, userId: string) {
    try {
      const { oldPassword, newPassword, confirmPassword } = data;
  
      if (newPassword !== confirmPassword) {
        return 'newPassword!=confirmPassword'; 
      }
      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      console.log(existingUser);
      const isMatch = await comparePassword(oldPassword, existingUser.password);
      if (!isMatch) {
        return 'PasswordIncorrect'; 
      }
      const pass = await hashPassword(newPassword);
      existingUser.password = pass;
      await existingUser.update({ password: pass });
  
      return existingUser
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }  


public static async getUserById(id: string) {
    try {
        const user = await User.findByPk(id);
        return user;
    } catch (error) {
        throw new Error(`Failed to get user by id: ${error.message}`);
    }
}



  }
export default userService;
 