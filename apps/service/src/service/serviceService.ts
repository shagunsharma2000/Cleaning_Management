import service from '../model/serviceModel';
import  dotenv from 'dotenv';
import logger from '../utils/logger/index'
import customer from '../../../customer/src/model/customerModel';
import user from '../../../management/src/model/userModel';

dotenv.config();



  class serviceServices {
    static findOne: any;
    
    //admin create  service //

public static async serviceCreate(serviceData) {
  try {
    const { name, description, price, duration } = serviceData;

    // Check if the service with the same name already exists
    const existingService = await service.findOne({ where: { name } });
    if (existingService) {
      throw new Error('Service with the same name already exists');
    }

    // Create the new service
    const createdService = await service.create({
      name,
      description,
      price,
      duration,
      status: 'active', // Provide a default status value
      dateTime: new Date() 
    });

    return createdService;
  } catch (error) {
    // Handle errors
    logger.error(`Failed to create service: ${error.message}`);
    throw new error('Failed to create service');
  }
}






// service by UserCustomer //
public static async getUserCustomerById(id: string) {
    try {
        const usercustomer = await service.findByPk(id);
        return usercustomer;
    } catch (error) {
        throw new error(`Failed to get usercustomer by id: ${error.message}`);
    }
}



  
// select the service booking //
public static async serviceBooking(servicedata) { 
  try {
    const {  dateTime } = servicedata;
   
    const booking = await service.create({
  
      dateTime
    });

    return booking;
  } catch (error) {
    logger.error(`Failed to create booking: ${error.message}`);
    throw new error('Failed to create booking');
  }
}



  public static async assignServiceToStaff(staffid: string, serviceid: string) {
    try {
    
      const staff:any = await user.findByPk(staffid);
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