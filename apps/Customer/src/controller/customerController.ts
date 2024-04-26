import customerServices from '../service/customerService'
import { message, statusCode } from '../utils/constants';
import { successAction, failAction } from '../utils/response';
import { Request, Response } from 'express';
import logger from '../utils/logger/index';



class customerController {

public static async registerCustomer(req: Request, res: Response) {
  try {
      const customerData = req.body;
      console.log("hjkl;",customerData)

     const user = await customerServices.registerCustomer(customerData);
      return res.status(201).json(successAction(201, user));
  } catch (err) {
      logger.error(message.errorLog('register', 'customerController', err))
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
      return err
  }
}

 

 
  public static async login(req: Request, res: Response) {
    try {
    
      const data = await customerServices.login(req.body);

      if (data.error === 'invalidPassword' || data.error === 'notExist') {
     
        res.status(statusCode.success).json(failAction(statusCode.success, data.error, data.message));
      } else {
       
        res.status(statusCode.success).json(successAction(statusCode.success, { token: data.token }, data.message));
      }
    } catch (err) {
      logger.error(message.errorLog('login', 'customerController', err))
      res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
    }
  }



  public static async updateCustomer(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email } = req.body; 

    
      const customer = await customerServices.updateCustomer(id, {
        name,
        email,

      });

      return res.status(200).json(successAction(200, customer));
    } catch (err) {
      logger.error(message.errorLog('update', 'customerController', err))
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }


public static async deleteCustomer(req: Request, res: Response) {
  try {
      const customerId = req.params.id;

     
      await customerServices.deleteCustomer(customerId);
      
      res.status(statusCode.success).json({
          statusCode: statusCode.success,
          message: message.delete('customer') 
      });
  } catch (err) {
      logger.error(message.errorLog('delete', 'customerController', err))
      res.status(statusCode.badRequest).json({
          statusCode: statusCode.badRequest,
          error: err.message,
          message: message.somethingWrong
      });
  }
}



  public static async changePassword(req: Request, res: Response) {
    try {
      const data = req.body;
      const customerId: string = req.params.id; 

      const customerData = await customerServices.changePassword(data, customerId);
      if (customerData === 'newPassword!=confirmPassword') { 
        res.status(statusCode.badRequest).json(
          failAction(statusCode.notAllowed, data, message.somethingWrong)
        );
      } else if (customerData === 'customerDoesNotExists') {
        res.status(statusCode.notFound).json(
          failAction(statusCode.emailOrCustomerExist, data, message.notExist('customer'))
        );
      } else if (customerData === 'PasswordIncorrect') { 
        res.status(statusCode.unauthorized).json( 
          failAction(statusCode.unauthorized, data, message.somethingWrong) 
        );
      } else {
        res.status(statusCode.success).json(
          successAction(statusCode.success, data, message.update('Password'))
        );
      }
    } catch (err) {
      logger.error(message.errorLog('customerUpdate', 'customerController', err)); 
      res.status(statusCode.emailOrCustomerExist).json(
        failAction(statusCode.badRequest, err.message, message.somethingWrong)
      );
    }
  }


  public static async getCustomerById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      if (!id) {
        return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, 'customer ID is required'));
      }
      const customer = await customerServices.getCustomerById(id);
      console.log(customer, "ebvcfgfhgh")
      if (!customer) {
        return res.status(statusCode.notFound).json(failAction(statusCode.notFound, 'customer not found'));
      }
      return res.status(statusCode.success).json(successAction(statusCode.success, customer));
    } catch (err) {
      logger.error(message.errorLog('getCustomerById', 'customerController', err));
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }






}
export default customerController;
