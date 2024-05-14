import userServices from '../service/userService';
import { message, statusCode } from '../utils/constants';
import { successAction, failAction } from '../utils/response';
import { Request, Response } from 'express';
import logger from '../utils/logger/index';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Role from '../utils/enums/indexEnums';
import { stat } from 'fs/promises';
dotenv.config();

class userController {
  //create user//
  public static async registerUser(req: Request, res: Response) {
    try {
      const userData = req.body;
      console.log('honeycfghj', userData);

      const user = await userServices.registerUser(userData);
      return res.status(201).json(successAction(201, user));
    } catch (err) {
      logger.error(message.errorLog('register', 'userController', err));
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }

  //user login//
  public static async login(req: Request, res: Response) {
    try {
      const data = await userServices.login(req.body);

      if (data.error === 'invalidPassword' || data.error === 'notExist') {
        // Return appropriate error response for invalid password or non-existing user
        res.status(statusCode.unauthorized).json(failAction(statusCode.badRequest, data.error, data.message));
      } else {
        // Return success response with token for valid login
        res.status(statusCode.success).json(successAction(statusCode.success, { token: data.token }, data.message));
      }
    } catch (err) {
      logger.error(message.errorLog('login', 'userController', err));
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  //user update//
  public static async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body; // Assert req.body to UserData

      // Pass only necessary fields to updateUser function
      const user = await userServices.updateUser(id, req.body);

      return res.status(200).json(successAction(200, user));
    } catch (err) {
      logger.error(message.errorLog('update', 'userController', err));
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }

  //user delete//
  public static async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;

      await userServices.softdeleteUser(userId);

      res.status(statusCode.success).json({
        statusCode: statusCode.success,
        message: message.delete('user'),
      });
    } catch (err) {
      logger.error(message.errorLog('delete', 'userController', err));
      res.status(statusCode.badRequest).json({
        statusCode: statusCode.badRequest,
        error: err.message,
        message: message.somethingWrong,
      });
    }
  }

  // user change password API //
  public static async changePassword(req: Request, res: Response) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const userId = req.params.id;

      const userData = await userServices.changePasswordService({
        oldPassword,
        newPassword,
        confirmPassword,
        userId,
      });

      return res.status(statusCode.success).json(successAction(statusCode.success, req.body));
      if (userData === 'newPassword!=ConfirmPassword') {
        return res.status(statusCode.badRequest).json(failAction(statusCode.notAllowed, req.body, message.somethingWrong));
      }
      if (userData === 'userDoesNotExists') {
        return res.status(statusCode.notFound).json(failAction(statusCode.emailOrUserExist, req.body, message.notExist('User')));
      }
      if (userData === 'oldPasswordIncorrect') {
        return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, req.body, message.somethingWrong));
      }
      return res.status(statusCode.success).json(successAction(statusCode.success, req.body, message.update('Password')));
    } catch (err) {
      logger.error(message.errorLog('userUpdate', 'userController', err));
      return res.status(statusCode.emailOrUserExist).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }

  // user getUserById//
  public static async getUserById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      if (!id) {
        return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, 'user ID is required'));
      }
      const user = await userServices.getUserById(id);
      console.log(user, 'ebvcfgfhgh');
      if (!user) {
        return res.status(statusCode.notFound).json(failAction(statusCode.notFound, 'user not found'));
      }
      return res.status(statusCode.success).json(successAction(statusCode.success, user));
    } catch (err) {
      logger.error(message.errorLog('getUserById', 'userController', err));
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }
}
export default userController;
