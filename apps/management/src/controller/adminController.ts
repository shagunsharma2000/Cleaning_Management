import AdminServices from '../service/adminService';
import { message, statusCode } from '../utils/constants';
import { successAction, failAction } from '../utils/response';
import { Request, Response } from 'express';


class AdminController {
    public static async registerAdmin(req: Request, res: Response) {
        try {
            const { name, phonenumber, email, password} = req.body; // Assert req.body to AdminData
    
            // Ensure all required fields are present
            if (!name || !phonenumber || !email || !password ) {
                return res.status(400).json({ message: 'name, phonenumber, email, and password are required' });
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
            return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
        }
    }


    public static async login(req: Request, res: Response) {
        try {
            const data = await AdminServices.login(req.body);
    
            if (data.error === 'invalidAdmin') {
                res.status(statusCode.success).json(failAction(statusCode.success, data.error, message.invalidlogin));
            } else if (data.error === 'notExist') {
                res.status(statusCode.success).json(failAction(statusCode.success, data.error, message.notExist('admin')));
            } else {
                res.status(statusCode.success).json(successAction(statusCode.success, { token: data.token }, message.login));
            }
        } catch (err) {
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
        console.error('Error:', error);
        res.status(500).send('Internal Server Error');
    }
}








}
export default AdminController;
