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
        const { customerid ,name, description, price ,duration ,dateTime} = serviceData;
       
        const existingservice = await service.findOne({ where: { name } });
        if (existingservice) {
            throw new Error('name already exists');
        }
    
        const customer = await service.create({
            name,
            description,
            price, 
            duration,
            customerid,
            dateTime
           
        });

        return customer;
    } catch (error) {
        logger.error(`Failed to create service: ${error.message}`);
        throw new Error('Failed to create service');
    }
}
// service by UserCustomer //
public static async getUserCustomerById(id: string) {
    try {
        const usercustomer = await service.findByPk(id);
        return usercustomer;
    } catch (error) {
        throw new Error(`Failed to get usercustomer by id: ${error.message}`);
    }
}



  
// select the 
public static async serviceBooking(servicedata) { 
  try {
    const { customerid, serviceid, dateTime } = servicedata;
   
    const booking = await service.create({
      customerid,
      serviceid,
      dateTime
    });

    return booking;
  } catch (error) {
    logger.error(`Failed to create booking: ${error.message}`);
    throw new Error('Failed to create booking');
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
      throw new Error('Error assigning service: ' + error.message);
    }
  }


  }
  export default serviceServices;