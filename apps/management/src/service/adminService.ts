import Admin from '../model/adminModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secret_key="lkjhgfdskjhgfkjhgf76543kjhgf"


  class AdminService {
    public static async registerAdmin(adminData) { // Add type annotation
        try {
            // Check if email already exists
            const existingAdmin = await Admin.findOne<Admin>({ where: { email: adminData.email } });

            if (existingAdmin) {
                
                throw new Error('email already exists');
            }

            const hashedPassword = await bcrypt.hash(adminData.password, 10);

            const admin = new Admin({

                name: adminData.name,
                phonenumber: adminData.phonenumber,
                email: adminData.email,
                password: hashedPassword,
                Role: adminData.Role || 'admin'// Pass Role from adminData
            });

            await admin.save();

            
            return admin;
        } catch (error) {
            throw new Error('Failed to register admin: ' + error.message);
        }
    }


   
    
    public static async login(credentials) {
        try {
            // Find the admin by email
            const admin = await Admin.findOne({ where: { email: credentials.email } });
    
            if (!admin) {
                // If admin doesn't exist, return an error
                return { error: 'notExist', message: 'Admin not found for the provided email' };
            }
    
            // Compare password hashes
            const validPassword = await bcrypt.compare(credentials.password, admin.password);
    
            if (!validPassword) {
                // If password is invalid, return an error
                return { error: 'invalidPassword'};
            }
    
            // Generate token
          
            const token = jwt.sign({ id: admin.id }, secret_key, { expiresIn: '1h' });
            
    
            return { token, message: 'Login successful' };
        } catch (error) {
            console.error('Error during admin login:', error);
            // Handle the error appropriately (e.g., log it, return an error response)
            throw new Error('Error during admin login: ' + error.message);
        }
    }
    
    

    
    


    public static async updateAdmin(id: string, adminData: { name: string, email: string}) {
        try {
            // Find admin by ID
            const admin = await Admin.findByPk(id);
      
            // If admin does not exist, throw an error
            if (!admin) {
                throw new Error('Admin not found');
            }
      
            // Update admin data
            admin.name = adminData.name;
            admin.email = adminData.email;
      
            // Save changes to the database
            await admin.save();
      
            return admin;
        } catch (error) {
            throw new Error('Failed to update admin: ' + error.message);
        }
      }
      


public static async deleteAdmin(adminId: string) {
    try {
        const deletedAdmin = await Admin.findByPk(adminId);
        if (!deletedAdmin) {
            throw new Error('Admin not found');
        }
        await deletedAdmin.destroy();
        return deletedAdmin; 
    } catch (error) {
        throw new Error(`Failed to delete admin: ${error.message}`);
    }

}


public static async changePassword(id: string, Password: string, newPassword: string, confirmPassword: string) {
    console.log("fcghfjk",id)
    try {
        // Check if Password, newPassword, and confirmPassword are provided
        if (!Password || !newPassword || !confirmPassword) {
            return { status: 400};
        }

        const admin = await Admin.findByPk(id);
        if (!admin) {
            return { status: 404};
        }

        // Compare  password
        const passwordMatch = await bcrypt.compare(Password, admin.password);
        if (!passwordMatch) {
            return { status: 401};
        }

        // Check if new password is same as old password
        if (Password === newPassword) {
            return { status: 400};
        }

        
        if (newPassword !== confirmPassword) {
            return { status: 400};
        }

        
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update Admin password with the hashed password
        admin.password = hashedPassword;
        await admin.save();


        return { status: 200 };
    } catch (error) {
        console.error('Error:', error);
        return { status: 500, message: 'Internal Server Error' };
    }
}

public static async getAdminById(id: string) {
    try {
        const admin = await Admin.findByPk(id);
        return admin;
    } catch (error) {
        throw new Error(`Failed to get admin by id: ${error.message}`);
    }
}



  }
export default AdminService;
