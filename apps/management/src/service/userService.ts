import User from '../model/userModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import logger from '../utils/logger/index';
import { comparePassword, hashPassword } from '../utils/common';
import Role from '../utils/enums/indexEnums';

dotenv.config();

class userService {
  /* USER CREATE API */

  // public static async registerUser(userData) {
  //   try {
  //     const { name, phonenumber, password, available, email, address, role } = userData;

  //     const existingUser = await User.findOne({ where: { email } });
  //     if (existingUser) {
  //       throw new Error('Email already exists');
  //     }
  //     const hashedPassword = await bcrypt.hash(password, 10);

  //     const user = await User.create({
  //       name,
  //       phonenumber,
  //       available,
  //       password: hashedPassword,
  //       email,
  //       address,
  //       role,
  //     });
  //     return user;
  //   } catch (error) {
  //     logger.error(`Failed to register user: ${error.message}`);
  //     throw new Error('Failed to register user');
  //   }
  // }
  public static async registerUser(userData) {
    try {
      const { name, phonenumber, password, available, email, address, role } = userData;

      // Check if the email already exists in the database
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        phonenumber,
        available,
        password: hashedPassword,
        email,
        address,
        role,
      });

      return user;
    } catch (error) {
      logger.error(`Failed to register user: ${error.message}`);
      throw new Error('Failed to register user');
    }
  }

  //user login service//
  public static async login(credentials) {
    try {
      const user = await User.findOne({ where: { email: credentials.email } });

      if (!user) {
        return { error: 'notExist' };
      }

      const validPassword = await bcrypt.compare(credentials.password, user.password);

      if (!validPassword) {
        return { error: 'invalidPassword' };
      }

      // Generate token

      const token = jwt.sign({ id: user.id, Role: user.role }, process.env.SECRET_KEY, { expiresIn: '1h' });

      return { token, message: 'Login successful' };
    } catch (error) {
      console.error('Error during user login:', error);
      logger.error(error);
      throw new Error('Error during user login: ' + error.message);
    }
  }

  // user update service
  public static async updateUser(id: string, userData: { name: string; email: string; role: any }) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('user not found');
      }

      // Update user data
      user.name = userData.name;
      user.email = userData.email;
      user.role = userData.role;
      // Save changes to the database
      await user.save();

      return user;
    } catch (error) {
      logger.error(error);
      throw new Error('Failed to update user: ' + error.message);
    }
  }

  // user delete service//
  public static async softdeleteUser(userId: string) {
    try {
      const deleteUser = await User.findByPk(userId);
      if (!deleteUser) {
        throw new Error('user not found');
      }

      await deleteUser.update({ isDeleted: true });
      return deleteUser;
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }

  // public static async changePasswordService(data) {
  //     try {
  //       const { oldPassword, newPassword, confirmPassword, userId } = data;
  //       if (newPassword !== confirmPassword) {
  //         return 'newPassword!=ConfirmPassword';
  //       }

  //       const existingUser = await User.findOne({

  //         where: {
  //           id: userId
  //         }
  //       });
  //       if (!existingUser) {

  //         return 'userDoesNotExists';
  //       }
  //       const isMatch = await comparePassword(oldPassword, existingUser.password);
  //       if (!isMatch) {
  //         return 'oldPasswordIncorrect';
  //       }
  //       const hashedPassword = await hashPassword(newPassword);
  //       existingUser.password = hashedPassword;
  //       await existingUser.save();

  //       return existingUser; // Return updated user
  //     }
  //     catch (err) {
  //       logger.error(err);
  //       throw new Error(err.message);
  //     }
  //   }

  // userService.ts
  public static async changePasswordService(data) {
    try {
      const { oldPassword, newPassword, confirmPassword, userId } = data;
      if (newPassword !== confirmPassword) {
        return 'newPassword!=ConfirmPassword';
      }

      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return 'userDoesNotExists';
      }
      const isMatch = await comparePassword(oldPassword, existingUser.password);
      if (!isMatch) {
        return 'oldPasswordIncorrect';
      }
      const hashedPassword = await hashPassword(newPassword);
      existingUser.password = hashedPassword;
      await existingUser.save();

      return 'success'; // Indicate success
    } catch (err) {
      logger.error(err);
      throw new Error(err.message);
    }
  }

  // user getUserById service//
  public static async getUserById(id: string) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      logger.error(error);
      throw new Error(`Failed to get user by id: ${error.message}`);
    }
  }
}
export default userService;
