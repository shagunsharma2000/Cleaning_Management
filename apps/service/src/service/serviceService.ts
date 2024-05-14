import service from '../model/serviceModel';
import dotenv from 'dotenv';
import logger from '../utils/logger/index';
// import customer from '../../../customer/src/model/customerModel';
// eslint-disable-next-line @nx/enforce-module-boundaries
import User from '../../../management/src/model/userModel';
import Status from '../utils/enums/indexEnums';

dotenv.config();

export class serviceServices {
  // static findOne: unknown;

  //admin create  service //

  public static async serviceCreate(serviceData) {
    try {
      const { name, description, price, duration, address } = serviceData;

      // Validate input data
      if (!name || !description || !price || !duration || !address) {
        throw new Error('Missing required fields');
      }

      const existingService = await service.findOne({ where: { name } });
      if (existingService) {
        throw new Error('A service with the same name already exists');
      }

      // Create the new service
      const createdService = await service.create({
        name,
        description,
        price,
        duration,
        address,
        status: Status.confirm,
        dateTime: new Date(),
      });

      return createdService;
    } catch (error) {
      // Log the error and throw a new error
      logger.error(`Failed to create service: ${error.message}`);
      throw new Error('Failed to create service');
    }
  }

  // get Service By Id //
  public static async getServiceById(id: string) {
    try {
      const services = await service.findByPk(id);
      return services ;
    } catch (error) {
      throw new Error(`Failed to get service by id: ${error.message}`);
    }
  }

  // select the service booking //
  public static async serviceBooking(servicedata) {
    try {
      const { dateTime } = servicedata;

      const booking = await service.create({
        dateTime,
      });

      return booking;
    } catch (error) {
      logger.error(`Failed to create booking: ${error.message}`);
      throw new error('Failed to create booking');
    }
  }

  public static async assignServiceToStaff(staffid: string, serviceid: string) {
    try {
      const staff: any = await User.findByPk(staffid);
      if (!staff) {
        throw new Error('Staff member not found');
      }

      staff.assignedServices.push(serviceid);
      await staff.save();

      return 'Service assigned successfully';
    } catch (error) {
      throw error('Error assigning service: ' + error.message);
    }
  }
}
export default serviceServices;
