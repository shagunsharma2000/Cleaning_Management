import service from '../service/serviceService';
import { message, statusCode } from '../utils/constants';
import { successAction, failAction } from '../utils/response';
import { Request, Response } from 'express';
import logger from '../utils/logger/index';
// eslint-disable-next-line @nx/enforce-module-boundaries
import customer from '../../../customer/src/model/customerModel';

export class serviceController {
  //service create //

  public static async serviceCreate(req: Request, res: Response) {
    try {
      const serviceData = req.body;

      // Call the serviceCreate method from your service class
      const createdService = await service.serviceCreate(serviceData);

      // Check if service creation was successful
      if (!createdService) {
        return res.status(statusCode.notFound).json(failAction(statusCode.notFound, 'Service not created'));
      }

      return res.status(201).json(successAction(statusCode.success, createdService));
    } catch (err) {
      logger.error(message.errorLog('create', 'serviceController', err));
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }

  /*********** getUserCustomerById ************/

  public static async getServiceById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      if (!id) {
        return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, 'service ID is required'));
      }
      const services = await service.getServiceById(id);
      console.log(services, 'ebvcfgfhgh');
      if (!services) {
        return res.status(statusCode.notFound).json(failAction(statusCode.notFound, 'service not found'));
      }
      return res.status(statusCode.success).json(successAction(statusCode.success, services));
    } catch (err) {
      logger.error(message.errorLog('getServiceById', 'serviceController', err));
      return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
  }

  // public static async serviceBooking(req: Request, res: Response) {
  //   try {
  //     const servicedata: any = req.body;
  //     const { customerid, serviceid, dateTime } = servicedata;

  //     if (!customerid || !serviceid || !dateTime) {
  //       return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, 'customerid, serviceid, and dateTime are required'));
  //     }

  //     const customerExists = await customer.findByPk(customerid);
  //     if (!customerExists) {
  //       return res.status(statusCode.notFound).json(failAction(statusCode.notFound, 'Customer not found'));
  //     }

  //     const serviceExists = await service.findOne({ where: { id: serviceid } });
  //     // if (!serviceExists) {
  //     //   return res.status(statusCode.notFound).json(failAction(statusCode.badRequest, 'Service not found'));
  //     // }

  //     // Call service to create booking
  //     const booking = await service.serviceBooking(servicedata);

  //     // Return success response
  //     return res.status(statusCode.success).json(successAction(statusCode.success, 'serviceBooking created successfully'));
  //   } catch (err) {
  //     logger.error(message.errorLog('serviceBooking', 'serviceController', err));
  //     return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
  //   }
  // }

  public static async assignServiceToStaff(req: Request, res: Response) {
    try {
      const { staffid, serviceid } = req.body;

      // Check if staffId and taskId are provided
      if (!staffid || !serviceid) {
        return res.status(400).json({ error: 'Staff ID and service iD are required' });
      }

      // Assign service to staff using service
      const result = await service.assignServiceToStaff(staffid, serviceid);

      return res.json({ message: 'Service assigned successfully', result });
    } catch (error) {
      console.error('Error assigning service:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default serviceController;
