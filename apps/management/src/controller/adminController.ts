import AdminServices from '../service/adminService';
import { message, statusCode } from '../utils/constants';
import { successAction, failAction } from '../utils/response';
import { Request, Response } from 'express';
import logger from '../utils/logger/index'



class AdminController {
    public static async registerAdmin(req: Request, res: Response) {
        console.log("nhghffg")
        try {
            const { name, phonenumber, email, password } = req.body; // Assert req.body to AdminData
    
            // Ensure all required fields are present
            if (!name || !phonenumber || !email || !password ) {
                return res.status(400).json({ message: 'name, phonenumber, email, and  password are required' });
            }
    
            // Pass only necessary fields to registerAdmin function
            const admin = await AdminServices.registerAdmin({
                name,
                phonenumber,
                email,
                password // Ensure password is passed
                
            });
    
            return res.status(201).json(successAction(201, admin, 'Admin registered successfully'));
        } catch (err) {
            logger.error(message.errorLog('register', 'adminController', err))
            return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
        }
    }


    public static async login(req: Request, res: Response) {
        try {
            console.log('inlogin')
            const data = await AdminServices.login(req.body);
    
            if (data.error === 'invalidPassword' || data.error === 'notExist') {
                // Return appropriate error response for invalid password or non-existing admin
                res.status(statusCode.success).json(failAction(statusCode.success, data.error, data.message));
            } else {
                // Return success response with token for valid login
                res.status(statusCode.success).json(successAction(statusCode.success, { token: data.token }, data.message));
            }
        } catch (err) {
            logger.error(message.errorLog('login', 'adminController', err))
            res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, err.message, message.somethingWrong));
        }
    }
    
    
   
    





public static async updateAdmin(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { name,  email} = req.body; // Assert req.body to AdminData

        // Ensure all required fields are present
        if (!name || !email ) {
            return res.status(400).json({ message: 'name and   email are required' });
        }

        // Pass only necessary fields to updateAdmin function
        const admin = await AdminServices.updateAdmin(id, {
            name,
            email,
           
        });

        return res.status(200).json(successAction(200, admin, 'Admin updated successfully'));
    } catch (err) {
        logger.error(message.errorLog('update', 'adminController', err))
        return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
}




public static async deleteAdmin(req: Request, res: Response) {
    try {
        const adminId = req.params.id;
        const deletedAdmin = await AdminServices.deleteAdmin(adminId);
        res.status(statusCode.success).json({
            statusCode: statusCode.success,
            data: deletedAdmin, // Include the deleted admin data in the response
            message: message.delete('admin')
        });
    } catch (err) {
        logger.error(message.errorLog('delete', 'adminController', err))
        res.status(statusCode.badRequest).json({
            statusCode: statusCode.badRequest,
            error: err.message,
            message: message.somethingWrong
        });
    }
}


public static async changePassword(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { Password, newPassword, confirmPassword } = req.body;

        const result = await AdminServices.changePassword(id, Password, newPassword, confirmPassword);
        res.status(result.status).send(result.message);
    } catch (error) {
        logger.error(message.errorLog('changePassword', 'adminController', error))
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}


public static async getAdminById(req: Request, res: Response) {
    try {
        const id: string = req.params.id; 
        if (!id) {
            return res.status(statusCode.badRequest).json(failAction(statusCode.badRequest, 'Admin ID is required'));
        }
        const admin = await AdminServices.getAdminById(id);
        console.log(admin,"ebvcfgfhgh")
        if (!admin) {
            return res.status(statusCode.notFound).json(failAction(statusCode.notFound, 'Admin not found'));
        }
        return res.status(statusCode.success).json(successAction(statusCode.success, admin, 'Admin found'));
    } catch (err) {
        logger.error(message.errorLog('getAdminById', 'adminController', err));
        return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
    }
}






}
export default AdminController;
