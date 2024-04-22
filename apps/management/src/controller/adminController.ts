import AdminServices from '../service/adminService';
import { message, statusCode } from '../utils/constants';
import { successAction, failAction } from '../utils/response';
import { Request, Response } from 'express';

class AdminController {
    public static async registerAdmin(req: Request, res: Response) {
        try {
            const { firstname, lastname, phonenumber, username, email, password } = req.body;

            // Ensure all required fields are present
            if (!firstname || !lastname || !phonenumber || !username || !email || !password) {
                return res.status(400).json({ message: 'firstname, lastname, phonenumber, username, email, and password are required' });
            }

            // Pass only necessary fields to registerAdmin function
            const admin = await AdminServices.registerAdmin({
                firstname,
                lastname,
                phonenumber,
                username,
                email,
                password // Ensure password is passed
            });

            return res.status(201).json(successAction(201, admin, 'Admin registered successfully'));
        } catch (err) {
            return res.status(statusCode.internalServerError).json(failAction(statusCode.internalServerError, err.message, message.somethingWrong));
        }
    }
}






export default AdminController;


